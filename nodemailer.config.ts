import nodemailer from "nodemailer";

const mail = process.env.MAIL;
const pass = process.env.PASS;

const transport = nodemailer.createTransport({
  service: "gmail",
  // port: 465,
  // secure: true,
  auth: {
    user: mail,
    pass: "ybdjjccvnzfptlui",
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});

export const sendConfirmationEmail = (
  name: string,
  email: string,
  confirmationCode: string
) => {
  console.log("Check");
  transport
    .sendMail({
      from: mail,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=/api/auth/verify/${confirmationCode}> Click here</a>
          </div>`,
    })
    .catch((err: any) => console.log(err));
};
