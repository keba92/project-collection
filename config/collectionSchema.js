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
    tema: {
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
CollectionSchema.index({'$**': 'text'});
module.exports = mongoose.model('collection', CollectionSchema);