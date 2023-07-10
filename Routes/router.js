const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/eticketControllers");
const authcontroller = require("../Controllers/authControllers");

// routes

router.get("/eticketinbox", controllers.geteticketinbox);
router.get("/boardinbox", controllers.getboardinbox);
router.get("/boardtodoinbox", controllers.getboardtodoinbox);
router.get("/boardinprogressinbox", controllers.getboardinprogressinbox);
router.get("/boarddoneinbox", controllers.getboarddoneinbox);
router.post("/eticketinboxadd", controllers.addeticketinbox);
router.get("/eticketgetdatasingle/:id", controllers.getsingleticketdetails);
router.put("/editticketdetails/:id", controllers.editticketdetails);
router.get("/login", authcontroller.login);
router.post("/register", authcontroller.register);
router.get("/getcolumns", controllers.getcolumns);
router.post("/addcolumns", controllers.addcolumns);
router.post("/editcolumns/:id", controllers.editcolumns);
router.delete("/deletecolumns/:id", controllers.deletecolumns);
router.post("/patchstatusboarddata", controllers.patchstatusboarddata);
router.get("/getticketdetailfunc/:id", controllers.getticketdetailfunc);

module.exports = router;