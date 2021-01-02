const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    collections: [String],
    items: [String],
    like: [Number],
    comments: [String]
});

module.exports = mongoose.model('product', ProductSchema);

