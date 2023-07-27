const mongoose = require("mongoose");
const validator = require("validator");

const compUsersSchema = new mongoose.Schema({
    company_id: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    user_name: {
        type: String,
        required: true,
        trim: true
    },
    user_phone: {
        type: String,
        trim: true
    },
    user_email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw Error("Not valid Email");
            }
        }
    },
    user_password: {
        type: String,
        required: true,
        trim: true
    },
    nationality: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    datecreated: Date
}, { timestamps: true });

const company_users = new mongoose.model("company_users", compUsersSchema);

module.exports = company_users;