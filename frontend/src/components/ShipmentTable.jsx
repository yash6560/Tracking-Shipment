import { useEffect, useState } from "react"
import { useShipmentStore } from "../store/useShipmentStore"
import ShipDialog from "./ShipDialog";
import EditLocation from "./EditLocation";

const ShipmentTable = () => {
    const {getAllShipments, shipments , isLoadding} = useShipmentStore();
    const [selectedShipment, setSelectedShipment] = useState(null);
    const [editShipment, setEditLocation] = useState(null);
    useEffect(() => {
      const shipmentsList = async() => {
        await getAllShipments();
      }
      shipmentsList();
    }, [getAllShipments])

    
    const handleRowClick = (ship) => {
        setSelectedShipment(ship);
        const model = document.getElementById("my_modal_3"); 
        if(model){
          model.showModal();
        }
          };

    if(isLoadding){
        return(
            <div className=" flex-1 items-center text-center w-full">Loading...</div>
        )
    }

    const handleEditLocation = (ship) => {
      setEditLocation(ship);
    }
    
  return (
    <>
    <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Shipment ID</th>
            <th className="border p-2">Container ID</th>
            <th className="border p-2">Current Location</th>
            <th className="border p-2">Destination</th>
            <th className="border p-2">ETA</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Details</th>
          </tr>
        </thead>
        <tbody>
            { shipments.map((ship) => (
                <tr className='text-zinc-200' key={ship._id} >
                    <td className="border p-2">{ship.shipmentId}</td>
                    <td className="border p-2">{ship.containerId}</td>
                    <td className="border p-2">{ship.currentLocation}</td>
                    <td className="border p-2 flex justify-between">{ship.destination} <button onClick={() => handleEditLocation(ship)} className="py-1 px-2 rounded bg-gray-500">Edit</button></td>
                    <td className="border p-2">{ship.eta}</td>
                    <td className="border p-2">{ship.status}</td>
                    <td className="border p-2 max-w-[300px]"><button onClick={() => handleRowClick(ship)} className="bg-green-400 text-black py-1 px-3 rounded">View Detail</button></td>
                </tr>
            ))}
        </tbody>
      </table>
            {selectedShipment && <ShipDialog shipment={selectedShipment}/>}
            {editShipment && <EditLocation ship={editShipment} onClose={() => setEditLocation(null)}/>}
      </>
  )
}

export default ShipmentTable