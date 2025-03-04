import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import PropTypes from "prop-types";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ShipmentMap = ({ route }) => {
  const polylineRoute = route.map((loc) =>
      loc.coordinates && loc.coordinates.length === 2
        ? [loc.coordinates[0], loc.coordinates[1]]
        : null
    )
    .filter(Boolean);

    const startPoint = polylineRoute[0];
  const endPoint = polylineRoute[polylineRoute.length - 1];

  return (
    <MapContainer center={startPoint} zoom={6} className="h-[400px] w-full rounded-lg">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Start Point Marker */}
      {startPoint && (
        <Marker position={startPoint}>
          <Popup>Start Point: {route[0].locationName}</Popup>
        </Marker>
      )}

      {/* Polyline Route */}
      {polylineRoute.length > 1 && <Polyline positions={polylineRoute} color="blue" />}

      {/* End Point Marker */}
      {endPoint && (
        <Marker position={endPoint}>
          <Popup>End Point: {route[route.length - 1].locationName}</Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

ShipmentMap.propTypes = {
  route: PropTypes.arrayOf(
    PropTypes.shape({
      coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
      locationName: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ShipmentMap