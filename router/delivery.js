const express = require('express');
const router = express.Router();

//ADD CONTROLLER AND MIDDLEWARE
const deliveryController = require('../controller/deliveryController');
const middleware = require('../middleware/login')

router.get('/',middleware.obrigatorio,deliveryController.getDelivery);
router.post('/',middleware.obrigatorio,deliveryController.createDelivery);
router.get('/:id',middleware.obrigatorio,deliveryController.getByIdDelivery);
router.patch('/:id',middleware.obrigatorio,deliveryController.updateDelivery);
router.patch('/enabled/:id',middleware.obrigatorio, deliveryController.updateEnabled);
router.patch('/deleted/:id',middleware.obrigatorio,deliveryController.updateDeleted);



module.exports = router;