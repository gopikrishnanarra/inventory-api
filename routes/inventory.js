const express = require('express');
const router = express.Router();
const { getInventory, addItem, deleteItem }  = require('../services/inventoryService');

router.get('/', async function(req, res) {
    await getInventory(res);
});
router.post('/addItem', async function(req, res) {
    await addItem(req, res);
});
router.delete('/delete', async function(req, res) {
    await deleteItem(req.query.id, res);
});

module.exports = router;
