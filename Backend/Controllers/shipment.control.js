const Shipment = require('../Models/shipment.models');
const axios = require("axios");
const getCoordinatesLive = require('../utils/getCoordinatesLive');

const AddShipment = async(req, res) => {
    try {
        const {shipmentId, containerId, destination, currentLocation, eta} = req.body;

        const CheckId = await Shipment.findOne({shipmentId})
        if(CheckId){
            return res.status(401).json({message : "Shipment already present", success : false});
        }

        const startCoordinates = await getCoordinatesLive(currentLocation);
        const endCoordinates = await getCoordinatesLive(destination);

        if (!startCoordinates || !endCoordinates) {
          return res.status(400).json({ message: "Invalid locations", success: false });
        }

        const routeDetails = [];
        const routeResponse = await axios.get(
          `https://router.project-osrm.org/route/v1/driving/${startCoordinates[1]},${startCoordinates[0]};${endCoordinates[1]},${endCoordinates[0]}?geometries=geojson`
        );

        if (routeResponse.data.routes.length > 0){
          const routeCoordinates = routeResponse.data.routes[0].geometry.coordinates;

          routeCoordinates.forEach((coord) => {
            routeDetails.push({ coordinates: [coord[1], coord[0]] });
          });
        }

        const newShipmet = await Shipment.create({
            shipmentId, containerId, route: routeDetails, destination, currentLocation, eta
        })

        return res.status(200).json({message : "Shipment is Added", success : true, newShipmet});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "internal server error", success : false});
    }
};

const getAllShipments = async(req, res) => {
    try {
        const shipments = await Shipment.find().sort({createdAt : -1});
        return res.status(200).json(shipments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "internal server error", success : false});
    }
}

const updateShipment = async(req, res) => {
  const {id} = req.params;
  const location = req.body.destination;

  try {
    const shipment = await Shipment.findById(id);
    const startCoordinates = await getCoordinatesLive(shipment.currentLocation);
    const endCoordinates = await getCoordinatesLive(location);

    if (!startCoordinates || !endCoordinates) {
      return res.status(400).json({ message: "Invalid locations", success: false });
    }

    const routeDetails = [];
    const routeResponse = await axios.get(
      `https://router.project-osrm.org/route/v1/driving/${startCoordinates[1]},${startCoordinates[0]};${endCoordinates[1]},${endCoordinates[0]}?geometries=geojson`
    );

    if (routeResponse.data.routes.length > 0){
      const routeCoordinates = routeResponse.data.routes[0].geometry.coordinates;

      routeCoordinates.forEach((coord) => {
        routeDetails.push({ coordinates: [coord[1], coord[0]] });
      });
    }

    const UpdatedShipment = await Shipment.findByIdAndUpdate(id, {destination : location, route: routeDetails}, {new : true});

    return res.status(200).json({message: "updated", success : true, UpdatedShipment});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message : "internal server error", success : false});
  }
  
}

module.exports = {AddShipment, getAllShipments, updateShipment};