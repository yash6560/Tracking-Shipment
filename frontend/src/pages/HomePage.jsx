import { useState } from 'react';
import { useShipmentStore } from '../store/useShipmentStore';
import ShipmentTable from '../components/ShipmentTable';

const HomePage = () => {
  const {addShipment, isLoadding, getAllShipments} = useShipmentStore();
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => setShowForm(!showForm);
  const [formData, setFormData] = useState({
    shipmentId : '',
    containerId : '',
    destination : '',
    currentLocation : '',
    eta : '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await addShipment(formData);
    if(res.success){
      setFormData({
        shipmentId : '',
        containerId : '',
        destination : '',
        currentLocation : '',
        eta : '',
      });
      getAllShipments();
      setShowForm(false);
    }

  }

  return (
    <div className="p-8 font-sans bg-black min-h-screen">
      <h1 className="text-center text-zinc-200 text-2xl font-bold mb-6">Shipment Dashboard</h1>
      <button onClick={toggleForm} className="bg-green-500 text-white py-2 px-4 rounded-full mb-6 hover:bg-green-600">
        {showForm ? 'Close Form' : 'Add Shipment'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-6 border rounded-lg shadow-md">
          <input name='shipmentId' onChange={handleChange} value={formData.shipmentId} type="text" placeholder="Shipment ID" className="block w-full mb-4 p-2 border rounded" required />
          <input  value={formData.containerId} name='containerId' onChange={handleChange} type="text" placeholder="Container ID" className="block w-full mb-4 p-2 border rounded" required/>
          <input  value={formData.currentLocation} name='currentLocation' onChange={handleChange} type="text" placeholder="Current Location" className="block w-full mb-4 p-2 border rounded" required/>
          <input  value={formData.eta} name='eta' type="datetime-local" onChange={handleChange} placeholder="ETA" className="block w-full mb-4 p-2 border rounded" required/>
          <input  value={formData.destination}  name="destination"  onChange={handleChange}  type="text"  placeholder="Destination Location"  className="block w-full mb-4 p-2 border rounded"  required/>
          <button type='submit' className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">{isLoadding ? "Loading..." : "Submit"}</button>
        </form>
      )}
      <ShipmentTable/>
    </div>
  )
}

export default HomePage