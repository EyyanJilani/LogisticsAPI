const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World"); // Safe fallback
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/submit-form", (req, res) => {
  const {
    movingFrom,
    movingTo,
    vehicleYear,
    make,
    model,
    condition,
    carrier,
    fullName,
    phone,
    email,
  } = req.body;

  if (
    !movingFrom ||
    !movingTo ||
    !vehicleYear ||
    !make ||
    !model ||
    !condition ||
    !carrier ||
    !fullName ||
    !phone ||
    !email
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [
      "joeegbert3@gmail.com",
      "info@moveprologistics.com",
      "mohammedshahmir48@gmail.com",
    ],
    subject: "New Form Submission: Vehicle Moving Details",
    text: `
      New form submission:

      Moving From: ${movingFrom}
      Moving To: ${movingTo}
      Vehicle Year: ${vehicleYear}
      Make: ${make}
      Model: ${model}
      Condition: ${condition}
      Carrier: ${carrier}
      
      Full Name: ${fullName}
      Phone: ${phone}
      Email: ${email}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: "Error sending email." });
    }
    res.status(200).json({ message: "Form submitted successfully!" });
  });
});

module.exports = app;
