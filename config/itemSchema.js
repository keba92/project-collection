const mongoose = require('mongoose');
const ItemSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    collections: {
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
    }
});

module.exports = mongoose.model('item', ItemSchema);