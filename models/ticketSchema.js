const mongoose = require("mongoose");
const validator = require("validator");

const ticketSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
        trim: true
    },
    contact_name: {
        type: String,
        required: true,
        trim: true
    },
    email_add: {
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
    channel: {
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
        unique: true
    },
    status: {
        type: String,
        required: true,
        default: "pending"
    },
    cs_type: {
        type: String,
        required: true
    },
    file_upload: {
        type: String
    },
    datecreated: Date
}, { timestamps: true });

const tickets = new mongoose.model("tickets", ticketSchema);

module.exports = tickets;