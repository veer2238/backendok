
import User from '../Modals/Attendance.js'
import express from "express";

const app = express();


app.post("/attendance", async (req, res) => {
    const { name, date, work } = req.body;
  
    const existingRecord = await User.findOne({ name, date });
  
    if (existingRecord) {
      return res
        .status(400)
        .json({ success: false, error: "Your record already exists" });
    }
  
    try {
      const result = await User.create({
        name,
        date,
        work,
      });
  
      console.log(result);
  
      // Send success response
      res
        .status(200)
        .json({ success: true, message: "Attendance record added successfully" });
  
     
    } catch (error) {
      console.error("Attendance Error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to add attendance record" });
    }
  });


app.get("/attendance-info", async (req, res) => {
    try {
      const allAttendanceData = await User.find();
      res.status(200).json(allAttendanceData);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });





  export default app