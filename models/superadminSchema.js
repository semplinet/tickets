const mongoose = require("mongoose");
const validator = require("validator");

const superAdminSchema = new mongoose.Schema({
    company_id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    company_name: {
        type: String,
        required: true,
        trim: true
    },
    company_phone: {
        type: String,
        required: true,
        trim: true
    },
    company_email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("Not valid Email");
            }
        }
    },
    company_branches: {
        type: String,
        required: true,
        trim: true
    },
    owner_name: {
        type: String,
        required: true,
        trim: true
    },
    owner_email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("Not valid Email");
            }
        }
    },
    owner_phone: {
        type: String,
        required: true,
        trim: true
    },
    owner_password: {
        type: String,
        required: true,
        trim: true
    },
    company_size: {
        type: String,
        required: true,
        trim: true
    },
    company_type: {
        type: String,
        required: true,
        trim: true
    },
    nationality: {
        type: String,
        required: true,
        trim: true
    },
    datecreated: Date
}, { timestamps: true });

const superadmin = new mongoose.model("superadmin", superAdminSchema);

module.exports = superadmin;