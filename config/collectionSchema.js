const mongoose = require('mongoose');
const CollectionSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    collections: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('collection', CollectionSchema);