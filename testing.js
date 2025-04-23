const parseCoords = (inputStr) => {
  const parts = inputStr.split(",").map(Number);
  const coords = [];

  for (let i = 0; i < parts.length; i += 2) {
    if (!isNaN(parts[i]) && !isNaN(parts[i + 1])) {
      coords.push([parts[i + 1], parts[i]]);
    }
  }
  return coords;
};



console.log(parseCoords("13.940878, 121.624210,13.940068, 121.614667,13.936619, 121.60859"))
// [121.624210,13.940878],
// [121.614667,13.940068],
// [121.608599,13.936619]


// Generate 4 variables (places) and put it in a card so that when clicked,
// the corresponding route or segment would display

let des1, des2, des3, des4

des1 = '121.60506409880308,13.934247113630493'
des2 = '121.608744263649,13.936777719148314'
des3 = '121.61473095417024,13.940140789781362,'
des4 = '121.62413477897645,13.94088396806257 '



console.log(des1,des2,des3,des4)