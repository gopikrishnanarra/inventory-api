const express = require('express');
const axios = require('axios');
const router = express.Router();
INVENTORY_URL = "https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ";

router.get('/', async function(req, res) {
    const inventory = await axios.get(INVENTORY_URL);
    res.send(inventory.data);
});
router.post('/addItem', async function(req, res) {
    await axios.post(INVENTORY_URL, req.body);
    res.send({})
});

module.exports = router;
