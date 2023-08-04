import mapboxgl from "mapbox-gl";

export const hoverableLayer = (
  map: mapboxgl.Map,
  layerName: string,
  action?: (
    e: mapboxgl.MapMouseEvent & {
      features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
    } & mapboxgl.EventData, action: string
  ) => void
) => {
  const canvasAction = (e: mapboxgl.MapMouseEvent & {
    features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
  } & mapboxgl.EventData) => {
    map.getCanvas().style.cursor = "pointer";
    action?.(e, "mouseenter");
  }
  const mouseLeaveAction = (e: mapboxgl.MapMouseEvent & {
    features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
  } & mapboxgl.EventData) => {
    map.getCanvas().style.cursor = "";
    action?.(e, "mouseleave");
  }

  map.on("mouseenter", layerName, canvasAction);

  map.on("mouseleave", layerName, mouseLeaveAction);
  
  return () => {
    map.off("mouseenter", layerName, canvasAction);
  
    map.off("mouseleave", layerName, mouseLeaveAction);
  }
};