const express = require('express');
const { AddShipment, getAllShipments, updateShipment } = require('../Controllers/shipment.control');

const router = express.Router();

router.get('/', getAllShipments)
// router.get(':id')
router.put('/:id/update-location', updateShipment)
router.get('/:id/eta')
router.post('/', AddShipment);

module.exports = router;