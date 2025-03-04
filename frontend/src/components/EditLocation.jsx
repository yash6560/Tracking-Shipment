import { useState } from "react";
import PropTypes from "prop-types";
import { useShipmentStore } from "../store/useShipmentStore";



const EditLocation = ({ship, onClose }) => {
    const {updateShipmentLocation, isUpdating, getAllShipments} = useShipmentStore();
    const [newLocation, setNewLocation] = useState(ship.destination || "");

    const handleUpdatLocation = async(e) => {
        e.preventDefault();
        await updateShipmentLocation(ship._id, newLocation);
        await getAllShipments()
        onClose();
    }

  return (
    <div className=" absolute w-96 rounded p-4 bg-gray-500 text-black">
        <div className="w-full flex flex-col gap-2">
            <input value={newLocation} className="py-1 px-3 rounded outline-none w-full" onChange={(e) => setNewLocation(e.target.value)}/>
            <button onClick={handleUpdatLocation} className="px-3 py-1 bg-green-400 rounded">{isUpdating ? "Updating..." : "Update"}</button>
            <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded">
                        Cancel
                    </button>
        </div>
    </div>
  )
}

EditLocation.propTypes = {
    ship: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        destination: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired, // Ensure onClose is provided
};

export default EditLocation