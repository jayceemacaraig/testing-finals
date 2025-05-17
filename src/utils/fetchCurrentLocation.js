const fetchCurrentLocation = async () => {
  if (!navigator.geolocation) {
    throw new Error('Geolocation is not supported by your browser.');
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve([longitude, latitude]);
      },
      (err) => {
        reject(new Error(`Location access denied or failed. (${err.message})`));
      }
    );
  });
};

async function main() {
  const [lng, lat] = await fetchCurrentLocation();
  // ...rest of your code...
}
main();

export {fetchCurrentLocation, lng, lat }
