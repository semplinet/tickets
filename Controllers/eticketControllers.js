const eticket = require("../models/eticketSchema");
const tickets = require("../models/ticketSchema");
const columns = require("../models/eticketcolumnSchema");
const moment = require("moment");
const BASE_URL = process.env.BASE_URL;
const uuid = require("uuid");

// eticketgetdata
// exports.geteticketinbox = async (req, res) => {
//     try {
//         const eticketdata = await eticket.find();
//         res.status(200).json({ eticketdata });
//     } catch (error) {
//         res.status(401).json(error);
//     }
// }

exports.getboarddoneinbox = async (req, res) => {
    try {
        const status = 'Done';
        const boarddata = await tickets.find({ status: status });
        // console.log(boarddata);
        const boardrequesteddata = boarddata.map((element) => {
            // console.log(element);
            return ({
                id: uuid.v4(),
                issue: element.issue,
                issuetype: element.issue_type,
                contactperson: element.contact_name,
                priority: element.priority,
                companyname: element.company_name,
                datecreated: element.datecreated,
                ticket_no: element.ticket_no,
                db_id: element._id
            })
        });
        res.status(200).json({ boardrequesteddata });
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.getboardinprogressinbox = async (req, res) => {
    try {
        const status = 'In Progress';
        const boarddata = await tickets.find({ status: status });
        // console.log(boarddata);
        const boardrequesteddata = boarddata.map((element) => {
            // console.log(element);
            return ({
                id: uuid.v4(),
                issue: element.issue,
                issuetype: element.issue_type,
                contactperson: element.contact_name,
                priority: element.priority,
                companyname: element.company_name,
                datecreated: element.datecreated,
                ticket_no: element.ticket_no,
                db_id: element._id
            })
        });
        res.status(200).json({ boardrequesteddata });
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.getboardtodoinbox = async (req, res) => {
    try {
        const status = 'To Do';
        const boarddata = await tickets.find({ status: status });
        // console.log(boarddata);
        const boardrequesteddata = boarddata.map((element) => {
            // console.log(element);
            return ({
                id: uuid.v4(),
                issue: element.issue,
                issuetype: element.issue_type,
                contactperson: element.contact_name,
                priority: element.priority,
                companyname: element.company_name,
                datecreated: element.datecreated,
                ticket_no: element.ticket_no,
                db_id: element._id
            })
        });
        res.status(200).json({ boardrequesteddata });
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.getboardinbox = async (req, res) => {
    try {
        const status = 'Requested';
        const boarddata = await tickets.find({ status: status });
        // let abc = [];
        // console.log(boarddata);
        const boardrequesteddata = boarddata.map((element) => {
            // console.log(element);
            return ({
                id: uuid.v4(),
                issue: element.issue,
                issuetype: element.issue_type,
                contactperson: element.contact_name,
                priority: element.priority,
                companyname: element.company_name,
                datecreated: element.datecreated,
                ticket_no: element.ticket_no,
                db_id: element._id
            })
            // console.log(uuid.v4());
        });
        // console.log(boardrequesteddata);
        res.status(200).json({ boardrequesteddata });
    } catch (error) {
        res.status(401).json(error);
    }
}

exports.geteticketinbox = async (req, res) => {
    try {
        const eticketdata = await tickets.find();
        res.status(200).json({ eticketdata });
    } catch (error) {
        res.status(401).json(error);
    }
}

// columns get data
exports.getcolumns = async (req, res) => {
    try {
        const columnsdata = await columns.find();
        res.status(200).json({ columnsdata });
    } catch (error) {
        res.status(401).json(error);
    }
}

// columns add data
exports.addcolumns = async (req, res) => {
    const { column_name } = req.body;
    if (!column_name) {
        res.status(401).json("All inputs required");
    }
    try {
        const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        const columnData = new columns({
            column_name, datecreated
        });
        await columnData.save();
        res.status(200).json(columnData);
    } catch (error) {
        res.status(401).json(error);
    }
}

// eticketadddata
// exports.addeticketinbox = async (req, res) => {
//     const { comp_name, person_name, email, issue_type, issue, priority, status, ticket_no } = req.body;
//     // console.log(req.body);
//     if (!comp_name || !person_name || !email || !issue_type || !issue || !ticket_no) {
//         res.status(401).json("All Inputs are required");
//     }
//     try {
//         const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
//         const eticketData = new eticket({
//             comp_name, person_name, email, issue_type, issue, priority, status, ticket_no, datecreated
//         });
//         await eticketData.save();
//         res.status(200).json(eticketData);
//     } catch (error) {
//         res.status(401).json(error);
//         console.log("catch block error");
//     }
// }

exports.addeticketinbox = async (req, res) => {
    const { company_name, contact_name, email_add, issue_type, channel, issue, priority, ticket_no, status, cs_type, file_upload } = req.body;
    // console.log(req.body);
    if (!company_name || !contact_name || !email_add || !issue_type || !channel || !issue || !ticket_no) {
        res.status(401).json("All Inputs are required");
    }
    try {
        const datecreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");
        const ticketData = new tickets({
            company_name, contact_name, email_add, issue_type, channel, issue, priority, ticket_no, status, cs_type, file_upload, datecreated
        });
        await ticketData.save();
        res.status(200).json(ticketData);
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error");
    }
}

// single ticket details

exports.getsingleticketdetails = async (req, res) => {
    const { id } = req.params;
    try {
        const singleeticketdetails = await eticket.findOne({ _id: id });
        res.status(200).json(singleeticketdetails);
    } catch (error) {
        res.status(401).json(error);
        console.log("catch block error");
    }
}

exports.getticketdetailfunc = async (req, res) => {
    const { id } = req.params;
    try {
        const singleboarddata = await tickets.findOne({ _id: id });
        res.status(200).json(singleboarddata);
    } catch (error) {
        res.status(401).json(error);
        console.log("catch blck err");
    }
}

exports.patchstatusboarddata = async (req, res) => {
    const oldstack = req.body.destoldstack;
    const newstack = req.body.destnewstack;
    const status = req.body.destcolname;
    // console.log(newstatusname);
    var props = ['db_id'];
    var result = newstack.filter(function (o1) {
        // filter out (!) items in result2
        return !oldstack.some(function (o2) {
            return o1.db_id === o2.db_id;          // assumes unique id
        });
    }).map(function (o) {
        // use reduce to make objects with only the required properties
        // and map to apply this to the filtered array as a whole
        return props.reduce(function (newo, db_id) {
            newo[db_id] = o[db_id];
            return newo;
        }, {});
    });
    // const dragged_db_id = JSON.stringify(result, null, 4);
    for (let cc = 0; cc < result.length; cc++) {
        const newstackid = result[cc].db_id;
        const editstatusboard = await tickets.findByIdAndUpdate({ _id: newstackid }, {
            status
        }, {
            new: true
        });
        await editstatusboard.save();
        res.status(200).json(editstatusboard);
    }


}

// column edit data

exports.editcolumns = async (req, res) => {
    const { id } = req.params;
    const { column_name } = req.body;
    try {
        const editcolumnstatus = await columns.findByIdAndUpdate({ _id: id }, {
            column_name
        }, {
            new: true
        });
        await editcolumnstatus.save();
        res.status(200).json(editcolumnstatus);
    } catch (error) {
        res.status(401).json(error);
    }
}

// edit ticket details

exports.editticketdetails = async (req, res) => {
    const { id } = req.params;
    const { comp_name, person_name, email, issue_type, issue, priority, status } = req.body;
    // console.log(req.body);
    try {
        const edittickstatus = await eticket.findByIdAndUpdate({ _id: id }, {
            comp_name, person_name, email, issue_type, issue, priority, status
        }, {
            new: true
        });
        // console.log(edittickstatus);
        await edittickstatus.save();
        res.status(200).json(edittickstatus);
    } catch (error) {
        res.status(401).json(error);
        console.log('catch block error');
    }
}

// delete columns

exports.deletecolumns = async (req, res) => {
    const { id } = req.params;
    try {
        const deletecolumn = await columns.findByIdAndDelete({ _id: id });
        res.status(200).json(deletecolumn);
    } catch (error) {
        res.status(401).json(error);
    }
}

