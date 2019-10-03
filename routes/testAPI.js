const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async function(req, res) {
        const API_KEY = '583445573231844'
        const API_SECRET = 'knWGSHrzyKFV-3tqojei9yhtP-o'
    // const { API_KEY,  API_SECRET } = req.query;
    const data = await axios.get('https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ');
    res.send(data.data);

    // res.send('hello')

});

module.exports = router;
