const mongoose = require('mongoose');
const CollectionSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    teg: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    poleItem: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('collection', CollectionSchema);