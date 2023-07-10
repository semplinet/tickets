const mongoose = require("mongoose");

const eticketcolumnSchema = new mongoose.Schema({
    column_name: {
        type: String,
        required: true,
        trim: true
    }, datecreated: Date
}, { timestamps: true });

const eticketcolumn = new mongoose.model("eticketcolumn", eticketcolumnSchema);
module.exports = eticketcolumn;