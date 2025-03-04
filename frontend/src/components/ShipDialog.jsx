import ShipmentMap from "./ShipmentMap";
import PropTypes from 'prop-types';

const ShipDialog = ({shipment}) => {
  return (
    <dialog id="my_modal_3" className="modal bg-black">
  <div className="modal-box">
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <div className="p-3 rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">Shipment Details</h2>
      <div className="space-y-2">
        <div>
          <span className="font-semibold">Shipment ID:</span> {shipment.shipmentId}
        </div>
        <div>
          <span className="font-semibold">Container ID:</span> {shipment.containerId}
        </div>
        <div>
          <span className="font-semibold">Current Location:</span> {shipment.currentLocation}
        </div>
        <div>
          <span className="font-semibold">Destination Location:</span> {shipment.destination}
        </div>
        <div>
          <span className="font-semibold">ETA:</span> {shipment.eta}
        </div>
        <div>
          <span className="font-semibold">Status:</span> {shipment.status}
        </div>
        
        <div>
          <ShipmentMap route={shipment.route}/>
        </div>
      </div>
    </div>
  </div>
</dialog>
  )
}

ShipDialog.propTypes = {
    shipment: PropTypes.shape({
    shipmentId: PropTypes.string.isRequired,
    containerId: PropTypes.string.isRequired,
    currentLocation: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    eta: PropTypes.string.isRequired,
    status: PropTypes.string,
    route: PropTypes.arrayOf(PropTypes.string).isRequired,
  }),
};

export default ShipDialog