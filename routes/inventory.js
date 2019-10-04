const express = require('express');
const axios = require('axios');
const router = express.Router();
// const getInventory  = require('../services/inventoryService');

router.get('/', async function(req, res) {
    const inventory = axios.get("https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ")
        .then(res => res.json())
        .then(list => {
              return list
        });
    res.send(inventory);
});

module.exports = router;
