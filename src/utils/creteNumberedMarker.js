import L from "leaflet";

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

const createNumberedMarker = (map, coords, number) => {
  const icon = L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        background-color: ${markerColors[number - 1]};
        color: white;
        width: 40px;a
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 15px;
        border-radius: 20%;
        border: 2px solid white;
        font-weight: bold;
        box-shadow: 0 0 3px rgba(0,0,0,0.5);
      ">
        ${number}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return L.marker(coords, { icon }).addTo(map);
};

export default createNumberedMarker;
