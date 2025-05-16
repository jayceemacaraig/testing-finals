function formatDistance(meters) {
  return meters >= 1000
    ? `${(meters / 1000).toFixed(1)} km`
    : `${meters.toFixed(0)} m`;
}

export default formatDistance;