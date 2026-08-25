const express = require("express");
const {
  addDoctor,
  adminLogin,
  checkAdmin,
  getAllDoctors,
  DeleteDoctor,
  showAppointments
} = require("../controllers/admin");

const upload = require("../middleware/multer");
const authAdmin = require("../middleware/authadmin");

const adminRouter = express.Router();

// Admin Authentication
adminRouter.post("/login", adminLogin);
adminRouter.get("/check", authAdmin, checkAdmin);
adminRouter.get("/doctor-list",authAdmin,getAllDoctors)
adminRouter.delete('/delete/:id',authAdmin,DeleteDoctor)

// Doctor Management
adminRouter.post("/add-doctor",authAdmin,upload.single("image"),addDoctor);
adminRouter.get("/allappointments",showAppointments)
module.exports = adminRouter;