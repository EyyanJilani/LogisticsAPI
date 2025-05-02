const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method === "GET") {
    return res.status(200).send("Submit-form API is live!");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

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

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // e.g. joeegbert3@gmail.com
      pass: process.env.EMAIL_PASS, // App password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: [
      "joeegbert3@gmail.com",
      "info@moveprologistics.com",
      "mohammedshahmir48@gmail.com",
    ],
    subject: "New Form Submission: Vehicle Moving Details",
    text: `
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

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Error sending email." });
  }
};
