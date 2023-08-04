import { Box, createStyles } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { PageContainer } from "components";
import { mapIcons } from "consts";
import { useClient } from "hooks/useClient";
import { useMap } from "hooks/useMap";
import { hoverableLayer, mapImageLoader } from "modules";
import { FC, ReactElement, useCallback, useEffect, useRef } from "react";

const useStyles = createStyles(() => ({
  mapContainer: {
    width: "100%",
    height: "100%",
  },
}));

const center: [lng: number, lat: number] = [
  125.17606140816277, 1.4452048558255155,
];
const zoom = 13;

const Layout: FC = (): ReactElement => {
  const { client } = useClient();
  const { classes, theme } = useStyles();
  const { map, mapContainer } = useMap({ zoom, center });
  const infras = useQuery({
    queryKey: ["infras"],
    queryFn: () => client.service("infras").find({}),
    onSuccess(data) {
      console.log(data);
    },
  });
  const mapLoaded = useRef<boolean>(false);

  const updateMap = useCallback(() => {
    if (typeof map !== "undefined" && typeof infras.data !== "undefined") {
      mapIcons.forEach(async (icon) => {
        if (!map.hasImage(icon.name)) {
          await mapImageLoader(map, icon.icon, icon.name.toUpperCase());
        }
      });

      const infraSource = map.getSource("infra-source");
      const infraLayer = map.getLayer("infra-layer");

      if (
        typeof infraSource === "undefined" &&
        typeof infraLayer === "undefined"
      ) {
        map.addSource("infra-source", {
          data: {
            type: "FeatureCollection",
            features: infras.data.features.map((feature) => ({
              ...feature,
              id: feature.properties.id_infra,
            })),
          },
          type: "geojson",
        });
        map.addLayer({
          id: "infra-layer",
          source: "infra-source",
          type: "symbol",
          layout: {
            "icon-image": ["get", "nama_jenis"],
            "text-field": ["get", "nama_infra"],
            "text-variable-anchor": ["top"],
            "text-justify": "center",
            "text-radial-offset": 0.65,
            "icon-size": 0.165,
            "text-allow-overlap": false,
            "text-size": 12,
            // "icon-anchor": "bottom",
            "icon-offset": [0, -90.55],
          },
          paint: {
            "text-halo-color": "white",
            "text-halo-width": 3,
            "text-color": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              theme.colors.pink[5],
              "#2d3436",
            ],
          },
        });
      }
    }
  }, [infras.data, map, theme.colors.pink]);
  const hoveredContentId = useRef<string | null>(null);

  useEffect(() => {
    if (typeof map !== "undefined" && typeof infras.data !== "undefined") {
      const mapInit = () => {
        console.log("map loaded");
        updateMap();
        mapLoaded.current = true;
        hoverableLayer(map, "infra-layer", (e, action) => {
          if (action === "mouseenter") {
            if ((e.features?.length ?? 0) > 0) {
              if (hoveredContentId.current !== null) {
                map.setFeatureState(
                  { source: "infra-source", id: hoveredContentId.current },
                  { hover: false }
                );
              }
              hoveredContentId.current = (e.features?.[0].id as string) ?? null;
              map.setFeatureState(
                { source: "infra-source", id: hoveredContentId.current },
                { hover: true }
              );
            }
          } else {
            if (hoveredContentId.current !== null) {
              map.setFeatureState(
                { source: "infra-source", id: hoveredContentId.current },
                { hover: false }
              );
            }
            hoveredContentId.current = null;
          }
        });
      };
      map.on("load", mapInit);
      if (mapLoaded.current) updateMap();

      return () => {
        map.off("load", mapInit);
      };
    }
  }, [infras.data, map, updateMap]);

  return (
    <PageContainer h={"100%"} p={0} title="Peta Infrastruktur">
      <Box className={classes.mapContainer} ref={mapContainer} />
    </PageContainer>
  );
};

export default Layout;
