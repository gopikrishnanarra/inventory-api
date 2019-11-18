const axios = require('axios');
const INVENTORY_URL = "https://api.mlab.com/api/1/databases/inventory/collections/inventory?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ";

async function getInventory(res) {
    const inventory = await axios.get(INVENTORY_URL);
    res.send(inventory.data);
}
async function addItem(req, res) {
    await axios.post(INVENTORY_URL, req.body);
    res.send({})
}
async function editItem(req, res) {
    const url = `https://api.mlab.com/api/1/databases/inventory/collections/inventory/${req.query.id}?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`;

    await axios.put(url, req.body);
    res.send('ok')
}
async function deleteItem(id, res) {
    const DELETE_URL = `https://api.mlab.com/api/1/databases/inventory/collections/inventory/${id}?apiKey=kIOuLscCmhbeSOoBEtJUYPV6vy1TMIaQ`
    await axios.delete(DELETE_URL);
    res.send({})
}

module.exports = {
    getInventory,
    addItem,
    editItem,
    deleteItem
}