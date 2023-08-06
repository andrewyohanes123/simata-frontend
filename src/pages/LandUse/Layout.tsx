import { Box, Group, Loader, Overlay, Text, createStyles } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { landuseColors } from "consts";
import { useClient } from "hooks/useClient";
import { useMap } from "hooks/useMap";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { hoverableLayer } from "modules";
import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { When } from "react-if";
import SearchCoordinate from "./SearchCoordinate";
import { useSearchParams } from "react-router-dom";
import { LandUseProperties } from "types/global";
import { useDisclosure } from "@mantine/hooks";
import LandDetail from "./LandDetail";
import Legend from "./Legend";

const useStyles = createStyles(() => ({
  mapContainer: {
    width: "100%",
    height: "100%",
  },
  wrapper: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
}));

const center: [lng: number, lat: number] = [
  125.17606140816277, 1.4452048558255155,
];
const zoom = 13;

const Layout: FC = (): ReactElement => {
  const { client } = useClient();
  const { classes, theme } = useStyles();
  const { map, mapContainer } = useMap({
    zoom,
    center,
    options: {
      locateUser: true,
    },
  });
  const landuse = useQuery({
    queryKey: ["landuse"],
    queryFn: () => client.service("landuse").find({}),
    refetchOnWindowFocus: false,
  });
  const mapLoaded = useRef<boolean>(false);
  const [searchParams] = useSearchParams();
  const mapMarker = useRef<mapboxgl.Marker>(
    new mapboxgl.Marker({ color: theme.colors.pink[6] })
  );
  const hoveredContentId = useRef<string | null>(null);

  const latitude = useMemo(() => searchParams.get("latitude"), [searchParams]);
  const longitude = useMemo(
    () => searchParams.get("longitude"),
    [searchParams]
  );

  useEffect(() => {
    if (typeof map !== "undefined") {
      if (latitude !== null && longitude !== null) {
        const parsedLat = parseFloat(latitude);
        const parsedLng = parseFloat(longitude);
        const lngLat: LngLatLike = [parsedLng, parsedLat];

        mapMarker.current.setLngLat(lngLat);
        map.flyTo({
          center: lngLat,
          zoom: 15,
        });
        mapMarker.current.addTo(map);
      } else {
        mapMarker.current.remove();
      }
    }
  }, [latitude, longitude, map]);

  const updateMap = useCallback(() => {
    const sourceId = "landuse-source";
    const layerId = "landuse-layer";
    if (typeof map !== "undefined" && typeof landuse.data !== "undefined") {
      const landuseSource = map.getSource(sourceId);
      const landuseLayer = map.getLayer(layerId);

      if (
        typeof landuseSource === "undefined" &&
        typeof landuseLayer === "undefined"
      ) {
        console.log("updated");
        map.addSource(sourceId, {
          type: "geojson",
          data: {
            ...landuse.data,
            features: landuse.data.features.map((feature, i) => ({
              ...feature,
              id: `${feature.properties.POLA_RUANG}-${i}`,
            })),
          },
        });
        map.addLayer({
          id: layerId,
          source: sourceId,
          type: "fill",
          paint: {
            "fill-color": landuseColors,
            "fill-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              1,
              0.5,
            ],
          },
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        landuseSource.setData({
          ...landuse.data,
          features: landuse.data.features.map((feature, i) => ({
            ...feature,
            id: `${feature.properties.POLA_RUANG}-${i}`,
          })),
        });
      }
    }
  }, [landuse.data, map]);

  const [selectedProperties, setSelectedProperties] =
    useState<LandUseProperties | null>(null);
  const [detail, { open, close }] = useDisclosure();

  useEffect(() => {
    if (typeof map !== "undefined") {
      console.log("update map");
      const mapInit = () => {
        console.log("map loaded");
        updateMap();
        mapLoaded.current = true;
      };
      const offEvent = hoverableLayer(map, "landuse-layer", (e, action) => {
        if (action === "mouseenter") {
          if ((e.features?.length ?? 0) > 0) {
            if (hoveredContentId.current !== null) {
              map.setFeatureState(
                { source: "landuse-source", id: hoveredContentId.current },
                { hover: false }
              );
            }
            hoveredContentId.current = (e.features?.[0].id as string) ?? null;
            map.setFeatureState(
              { source: "landuse-source", id: hoveredContentId.current },
              { hover: true }
            );
          }
        } else {
          if (hoveredContentId.current !== null) {
            map.setFeatureState(
              { source: "landuse-source", id: hoveredContentId.current },
              { hover: false }
            );
          }
          hoveredContentId.current = null;
        }
      });
      map.on("load", mapInit);
      if (mapLoaded.current) updateMap();

      const layerClickHandler = (
        e: mapboxgl.MapMouseEvent & {
          features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
        } & mapboxgl.EventData
      ) => {
        if (typeof e.features !== "undefined" && e.features?.length > 0) {
          const [feature] = e.features;
          const { lngLat } = e;
          mapMarker.current.setLngLat(lngLat);
          // if (mapMarker.current.)
          setSelectedProperties(feature.properties as LandUseProperties);
          open();
          mapMarker.current.addTo(map);
          console.log(feature.properties);
        }
      };

      map.on("click", "landuse-layer", layerClickHandler);

      return () => {
        map.off("click", "landuse-layer", layerClickHandler);
        map.off("load", mapInit);
        offEvent();
      };
    }
  }, [landuse.data, map, open, updateMap]);

  return (
    <Box className={classes.wrapper}>
      <SearchCoordinate />
      <Legend />
      <When
        condition={landuse.isLoading && typeof landuse.data === "undefined"}
      >
        <Overlay blur={10} opacity={0.5} color="#fff" center>
          <Group spacing="sm">
            <Loader />
            <Text>Loading data pola ruang</Text>
          </Group>
        </Overlay>
      </When>
      <Box key="landuse" className={classes.mapContainer} ref={mapContainer} />
      <LandDetail
        opened={detail}
        onClose={close}
        featureProperties={selectedProperties}
      />
    </Box>
  );
};

export default Layout;
