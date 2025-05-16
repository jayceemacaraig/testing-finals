import axios from "axios";

const fetchCoordinates = async (coords, setList, setStart,setRouteInfo) => {
  const apiKey = "5b3ce3597851110001cf624862a340fdb7724e99ae0b640191e2a890";

  try {
    const body = {
      coordinates: coords,
      // radiuses: [coords.map(() =>  1000)],
    };

    console.log("Sending to API:", JSON.stringify(body));
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      body,
      {
        headers: {
          Authorization: apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    
    const initList = response.data.features[0].geometry.coordinates;
    const initRoute = response.data.features[0].properties.segments;
    setList(initList);
    setRouteInfo(initRoute)
    setStart(true);
    console.log("Request Data", response.data);


  } catch (error) {
    console.error("Route error:", error);
    alert("Routing failed. Check your coordinates and try again.");
  }
};

export default fetchCoordinates;
