/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mapboxgl from "mapbox-gl";

export const mapImageLoader = (
  map: mapboxgl.Map,
  imageUrl: string,
  imageName: string
) => {
  return new Promise((resolve, reject) => {
    map.loadImage(imageUrl, (err, image) => {
      if (err) reject(err);
      if (!map.hasImage(imageName)) {
        map.addImage(imageName, image!);
        resolve(imageName);
      } else {
        // console.log({ imageName });
        // reject({ error: "image already exists" });
      }
    });
  });
};