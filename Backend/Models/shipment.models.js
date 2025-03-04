const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
    shipmentId: {
        type: String,
        required: true,
        unique: true,
      },
    containerId: {
        type : String,
        required: true,
    },
    destination : {
      type : String,
      required: true,
    },
    route: {
      type: [
        {
          coordinates: { type: [Number], required: true },
        },
      ],
      required: true,
    },
    currentLocation:  {
        type : String,
        required: true,
    },
    eta: {
        type: Date,
        required: true,
      },
    status:  {
        type : String,
        enum : ['Pending', 'In Transit', 'Delivered', 'Cancelled'],
        default : 'Pending',
    },
    },
{
    timestamps : true,
})

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;