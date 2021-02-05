const mongoose = require('mongoose');

let CategorySchema = new mongoose.Schema({
    id: String,
    catName: String,
    catDesc: String,
    catImgUrl: String,
    catContent: String,
    updated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Category', CategorySchema);