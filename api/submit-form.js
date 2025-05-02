const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
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

  // Validate the input fields
  if (
    !movingFrom || !movingTo || !vehicleYear || !make || !model ||
    !condition || !carrier || !fullName || !phone || !email
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // Nodemailer configuration
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'joeegbert3@gmail.com', // Set this in your .env file
      pass: 'ayuc glpv ndte jgva', // Set this in your .env file
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Set this in your .env file
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

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Error sending email." });
  }
};
