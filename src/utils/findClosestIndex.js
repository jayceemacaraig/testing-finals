const findClosestIndex = (list, target) => {
    return list.findIndex(([lng, lat]) => {
      const [targetLng, targetLat] = target;
      const lngDiff = Math.abs(lng - targetLng);
      const latDiff = Math.abs(lat - targetLat);
      return lngDiff < 0.0005 && latDiff < 0.0005;
    });
  };


export default findClosestIndex