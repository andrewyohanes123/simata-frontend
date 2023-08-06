import { Box, Group, Loader, Overlay, Text, createStyles } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { landuseColors } from "consts";
import { useClient } from "hooks/useClient";
import { useMap } from "hooks/useMap";
// import { hoverableLayer } from "modules";
import { FC, ReactElement, useCallback, useEffect, useRef } from "react";
import { When } from "react-if";

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
  const { classes } = useStyles();
  const { map, mapContainer } = useMap({ zoom, center });
  const landuse = useQuery({
    queryKey: ["landuse"],
    queryFn: () => client.service("landuse").find({}),
    onSuccess(data) {
      console.log(data);
    },
    onError(err) {
      console.log(err);
    },
  });
  const mapLoaded = useRef<boolean>(false);

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
          data: landuse.data,
        });
        map.addLayer({
          id: layerId,
          source: sourceId,
          type: "fill",
          paint: {
            "fill-color": landuseColors,
            "fill-opacity": 0.5,
          },
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        landuseSource.setData(landuse.data);
      }
    }
  }, [landuse.data, map]);

  useEffect(() => {
    if (typeof map !== "undefined") {
      console.log("update map");
      const mapInit = () => {
        console.log("map loaded");
        updateMap();
        mapLoaded.current = true;
      };
      map.on("load", mapInit);
      if (mapLoaded.current) updateMap();

      return () => {
        map.off("load", mapInit);
      };
    }
  }, [landuse.data, map, updateMap]);

  return (
    <Box className={classes.wrapper}>
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
    </Box>
  );
};

export default Layout;
