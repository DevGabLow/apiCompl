const express = require('express');
const router = express.Router();

const itemController = require('../controller/itemController');
const middle = require('../middleware/login');

router.get('/',middle.obrigatorio,itemController.getItems);
router.post('/',middle.obrigatorio,itemController.insertItems);
router.get('/:id',middle.obrigatorio,itemController.getOneItem);
router.patch('/:id',middle.obrigatorio,itemController.updateItem);
router.patch('/delete/:id',middle.obrigatorio,itemController.deleteItem);

module.exports = router;