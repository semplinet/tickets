const users = require('../models/usersSchema');
const authHelper = require('../helpers/authHelper');
const JWT = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email) {
            return res.send({
                error: `Email is required`
            });
        }
        if (!password) {
            return res.send({
                error: `Password is required`
            });
        }
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.register = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // validation
        if (!name) {
            return res.send({
                error: `Name is required`
            });
        }
        if (!email) {
            return res.send({
                error: `email is required`
            });
        }
        if (!password) {
            return res.send({
                error: `password is required`
            });
        }
        if (!phone) {
            return res.send({
                error: `phone is required`
            });
        }
        if (!address) {
            return res.send({
                error: `address is required`
            });
        }
        const existinguser = await users.findOne({ email });
        // console.log(existinguser);
        if (existinguser) {
            res.status(200).json('Already register please login');
        }
        const hashPassword = await authHelper.hashPassword(password);
        const newUser = new users({
            name, email, password, phone, address
        });
        await newUser.save();
        res.status(200).json("User saved successfully!");
    } catch (error) {
        console.log('catch block err');
        res.status(401).json(error);
    }
}