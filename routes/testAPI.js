const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async function(req, res) {
    const data = await axios.get('https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ');
    res.send(data.data);
});

module.exports = router;
