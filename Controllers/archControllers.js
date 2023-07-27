const superadmin = require("../models/superadminSchema");
const company_users = require("../models/companyusersSchema");
const auth_help = require("../helpers/authHelper");
const BASE_URL = process.env.BASE_URL;
const moment = require("moment");
const axios = require("axios");
const JWT = require("jsonwebtoken");

let generateRandumMathId = async () => {
    var num = Math.floor(Math.random() * 90000) + 10000;
    const company_id = 'ARV' + num;
    const companyexits = await superadmin.findOne({ company_id });

    if (companyexits === null) {
        return company_id;
    } else {
        return await generateRandumMathId();
    }
}

exports.addsuperadmin = async (req, res) => {
    const { company_name, company_email, company_phone, company_branches, owner_name, owner_email, owner_phone, owner_password, company_size, company_type, nationality, token } = req.body;

    if (!company_name || !company_email || !company_phone || !company_branches || !owner_name || !owner_email || !owner_phone || !owner_password || !company_size || !company_type || !nationality) {
        res.status(401).json("All Inputs are required");
    }

    try {
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.SECRET_KEY}&response=${token}`
        );
        if (response.data.success) {
            const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
            var company_id = await generateRandumMathId();
            const hased_password = await auth_help.hashPassword(owner_password);

            const superAdminData = new superadmin({
                company_id, company_name, company_email, company_phone, company_branches, owner_name, owner_email, owner_phone, owner_password: hased_password, company_size, company_type, nationality, datecreated
            });
            const resp = await superAdminData.save();
            const role = 0;
            const userData = new company_users({
                company_id, user_name: owner_name, user_phone: owner_phone, user_email: owner_email, user_password: hased_password, nationality: nationality, role, datecreated
            });
            await userData.save();
            res.status(200).json(userData);
        } else {
            res.status(401).json("Robot 🤖");
        }

    } catch (error) {
        res.status(401).json(error);
    }
}

exports.companylogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: 'invalid email or password'
            })
        }
        const user = await company_users.findOne({ user_email: email });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Email is not registered'
            })
        }

        const match = await auth_help.comparePassword(password, user.user_password);

        if (!match) {
            return res.status(200).json({
                success: false,
                message: 'Password incorrect'
            })
        }
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.status(200).json({
            success: true,
            message: 'login successfully',
            user: {
                name: user.user_name,
                email: user.user_email,
                phone: user.user_phone,
                role: user.role,
            },
            token,
        });
    } catch (error) {
        res.status(401).json(error);
    }
}