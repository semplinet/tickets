const mongoose = require("mongoose");
const validator = require("validator");

const eticketSchema = new mongoose.Schema({
    comp_name: {
        type: String,
        required: true,
        trim: true
    },
    person_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("Not valid Email");
            }
        }
    },
    issue_type: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        required: true
    },
    ticket_no: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    datecreated: Date
}, { timestamps: true });

const etickets = new mongoose.model("etickets", eticketSchema);

module.exports = etickets;