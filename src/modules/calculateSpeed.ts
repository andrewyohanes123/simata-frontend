export function calculateSpeed(
  t1: number,
  lat1: number,
  lng1: number,
  t2: number,
  lat2: number,
  lng2: number
) {
  // From Caspar Kleijne's answer starts
  /** Converts numeric degrees to radians */

  const toRad = function (num: number) {
    return (num * Math.PI) / 180;
  };
  // From Caspar Kleijne's answer ends
  // From cletus' answer starts
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(radLat1) *
      Math.cos(radLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  console.log({
    t1,
    lat1,
    lng1,
    t2,
    lat2,
    lng2,
    dLon,
    dLat,
    radLat1,
    radLat2,
    distance,
    t: t2 - t1,
  });
  // From cletus' answer ends

  return distance / t2 - t1;
}
