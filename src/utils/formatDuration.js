function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const hrs = Math.floor(mins / 60);
  const remainingMins = mins % 60;

  if (hrs > 0) {
    return `${hrs}h ${remainingMins}m`;
  } else if (mins > 0) {
    return `${mins}m`;
  } else {
    return `${Math.round(seconds)}s`;
  }
}

export default formatDuration;