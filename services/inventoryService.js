const db = require('../db/localDb');
const COLLECTION = 'inventory';

async function getInventory(res) {
    try {
        res.send(db.getAll(COLLECTION));
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Failed to load inventory' });
    }
}
async function addItem(req, res) {
    try {
        db.insert(COLLECTION, req.body);
        res.send({});
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Failed to add item' });
    }
}
async function editItem(req, res) {
    try {
        db.update(COLLECTION, req.query.id, req.body);
        res.send('ok');
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Failed to edit item' });
    }
}
async function deleteItem(id, res) {
    try {
        db.remove(COLLECTION, id);
        res.send({});
    } catch (e) {
        console.error(e);
        res.status(500).send({ error: 'Failed to delete item' });
    }
}

module.exports = {
    getInventory,
    addItem,
    editItem,
    deleteItem
}
