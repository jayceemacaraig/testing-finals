const fetchCurrentLocation = async (setUserLocation) => {
    let longtitude, latitude
      
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              latitude = position.coords.latitude
              longtitude =position.coords.longitude
            },
            (err) => {
              console.log(`ERROR(${err.code}): ${err.message}`);
            }
          );
        } else {
        }
      };
  
      await getLocation(); 
  
    setUserLocation([longtitude, latitude])
  };
  
  export default fetchCurrentLocation;