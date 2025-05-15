import L from "leaflet";
// import imageUrl from '../../public/pacific.jpg'

const createNumberedMarker = (number) => {
  const markerColors = [
    "#E74C3C", // Red
    "#3498DB", // Blue
    "#2ECC71", // Green
    "#E67E22", // Orange
    "#9B59B6", // Purple
    "#1ABC9C", // Teal
    "#F1C40F", // Yellow
    "#FF69B4", // Pink
    "#5D3FD3", // Indigo
    "#A3CB38", // Lime
    "#00CED1", // Cyan
    "#FF7F50", // Coral
    "#2C3E50", // Navy
    "#800000", // Maroon
    "#F39C12", // Gold
  ];

  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        background-color: ${markerColors[number]};
        color: white;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 15px;
        border-radius: 20%;
        border: 2px solid white;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 0 3px rgba(0,0,0,0.5);
      ">
        ${number + 1}
      </div>
    `,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -28],
  });


// return L.divIcon({
//     className: '',
//     html: `
//       <div style="
//         position: relative;
//         width: 60px;
//         height: 60px;
//         border-radius: 20%;
//         overflow: hidden;
//         border: 5px solid ${markerColors[number]};
//         box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);

//       ">
//         <img src="${imageUrl}" style="width: 100%; height: 100%; object-fit: cover;" />
//         <div style="
//           position: absolute;
//           bottom: -10px;
//           left: 50%;
//           transform: translateX(-50%);
//           width: 0;
//           height: 0;
//           border-left: 10px solid transparent;
//           border-right: 10px solid transparent;
//           border-top: 10px solid #fff;
//         "></div>
//       </div>
//     `,
//     iconSize: [60, 70],
//     iconAnchor: [25, 70], // tip of the triangle
//     popupAnchor: [0, -70],
//   });
};
;

export default createNumberedMarker;