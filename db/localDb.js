const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Simple JSON-file-backed datastore that replaces the old api.mlab.com backend.
// Each collection is a JSON file under db/data/ holding an array of documents.
// Documents keep an mLab-style id ({ _id: { $oid: "..." } }) so the rest of the
// app (routes/services that read user._id.$oid) keeps working unchanged.

const DATA_DIR = path.join(__dirname, 'data');

function filePath(collection) {
    return path.join(DATA_DIR, `${collection}.json`);
}

function ensureFile(collection) {
    if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const file = filePath(collection);
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, '[]');
    }
    return file;
}

function read(collection) {
    const file = ensureFile(collection);
    const raw = fs.readFileSync(file, 'utf8').trim();
    return raw ? JSON.parse(raw) : [];
}

function write(collection, docs) {
    const file = ensureFile(collection);
    fs.writeFileSync(file, JSON.stringify(docs, null, 2));
}

function newOid() {
    return crypto.randomBytes(12).toString('hex');
}

function getAll(collection) {
    return read(collection);
}

function insert(collection, doc) {
    const docs = read(collection);
    const record = { ...doc, _id: { $oid: newOid() } };
    docs.push(record);
    write(collection, docs);
    return record;
}

function update(collection, id, changes) {
    const docs = read(collection);
    let updated = null;
    const next = docs.map((doc) => {
        if (doc._id && doc._id.$oid === id) {
            updated = { ...doc, ...changes, _id: doc._id };
            return updated;
        }
        return doc;
    });
    write(collection, next);
    return updated;
}

function remove(collection, id) {
    const docs = read(collection);
    const next = docs.filter((doc) => !(doc._id && doc._id.$oid === id));
    write(collection, next);
    return docs.length - next.length;
}

module.exports = { getAll, insert, update, remove };
