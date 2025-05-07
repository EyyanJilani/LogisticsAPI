const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
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
    companyName,
  } = req.body;

  if (
    !movingFrom || !movingTo || !vehicleYear || !make || !model ||
    !condition || !carrier || !fullName || !phone || !email
  ) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'joeegbert3@gmail.com',
      pass: 'ayuc glpv ndte jgva',
    },
  });

  // Decide recipient based on fullName
  const companyEmail = companyName.toLowerCase().includes("OptimalMovers")
    ? "info@optimalautomovers.com"
    : "info@moveprologistics.com";

  const mailOptions = {
    from: 'joeegbert3@gmail.com',
    to: [
      "joeegbert3@gmail.com",
      companyEmail,
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
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    return res.status(500).json({ error: "Error sending email." });
  }
};
