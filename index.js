const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import the CORS package

const app = express();
const port = 3000;

app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Nodemailer transport configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "joeegbert3@gmail.com", // Replace with your email
    pass: "ayuc glpv ndte jgva", // Replace with your Gmail App password
  },
});

// API endpoint to handle form submission
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

  // Validate the input fields
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

  // Email options
  const mailOptions = {
    from: "joeegbert3@gmail.com", // Replace with your email
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

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: "Error sending email." });
    }
    res.status(200).json({ message: "Form submitted successfully!" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
