const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, name, token) => {
  const verifyUrl = `${process.env.CLIENT_URL}/verify/${token}`;

  const mailOptions = {
    from: `"Student Notes Manager" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Verify your email - Student Notes Manager",
    html: `
      <h2>Welcome, ${name}!</h2>
      <p>Thanks for registering at Student Notes Manager.</p>
      <p>Please verify your email address by clicking the link below:</p>
      <p><a href="${verifyUrl}" target="_blank">${verifyUrl}</a></p>
      <p>This link will expire in 1 hour. If you did not create an account, you can safely ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendVerificationEmail;
