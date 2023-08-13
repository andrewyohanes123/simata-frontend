import mapboxgl from "mapbox-gl";
import { RefObject, useEffect, useMemo, useRef, useState } from "react";

mapboxgl.accessToken =
  import.meta.env.VITE_APP_MAP_TOKEN ??
  "pk.eyJ1IjoiYW5kcmV3eW9oYW5lcyIsImEiOiJjamxqMGtjb3UwNnd2M3BvNThqZWhvM3lpIn0.pd3hVH7lja3mmaD2rSAgvw";

interface props {
  center: [lng: number, lat: number];
  zoom: number;
  style?: string;
  options?: {
    locateUser?: boolean;
  };
  pitch?: number;
  bearing?: number;
}

export type mapInstance = {
  map?: mapboxgl.Map;
  mapContainer: RefObject<HTMLDivElement>;
  setMap: (map?: mapboxgl.Map) => void;
};

// "mapbox://styles/andrewyohanes/clawykc3800k114mpvwr765re"

export const useMap = ({
  center,
  zoom,
  style,
  options,
  pitch = 0,
  bearing = 0,
}: props): mapInstance => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<mapboxgl.Map | undefined>();

  useEffect(() => {
    if (typeof map !== "undefined") {
      return;
    }
    if (mapContainer.current) {
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: `mapbox://styles/andrewyohanes/clkbcxkeu00rq01pfdwoub1xk`,
        center,
        zoom,
        attributionControl: false,
        pitch,
        bearing,
        interactive: true
      });
      mapInstance.addControl(new mapboxgl.ScaleControl(), "bottom-left");
      mapInstance.addControl(new mapboxgl.NavigationControl(), "bottom-left");
      if (options?.locateUser) {
        mapInstance.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
            showUserLocation: true,
          }),
          "bottom-left"
        );
      }
      setMap(mapInstance);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [center, style, zoom, mapContainer.current]);

  return useMemo(
    () => ({
      map: map,
      mapContainer,
      setMap,
    }),
    [map]
  );
};