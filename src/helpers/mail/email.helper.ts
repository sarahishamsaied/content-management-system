import nodemailer from "nodemailer";
import ejs from "ejs";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "cmsdevelopment23@gmail.com",
    pass: "bwbgxlseurfpfzpb",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

interface EmailData {
  subject: string;
  message: string;
  recepient: string;
}

interface EmailResponse {
  success: boolean;
  message: string | object;
  recepient: string;
}

const sendEmail = async (
  recepient: string,
  templatePath: string,
  data: EmailData,
  token: string
) => {
  const { subject, message } = data;
  const html = await ejs.renderFile(
    templatePath,
    {
      message,
      verificationLink: `${process.env.BASE_URL}/users/verify/${token}`,
    },
    { async: true }
  );
  const mailOptions = {
    from: process.env.CMS_EMAIL,
    to: recepient,
    subject,
    html,
  };

  const result = await transporter.sendMail(mailOptions);
  if (result.rejected.length > 0) {
    console.log(result);
    return {
      success: false,
      message: result.rejected,
      recepient,
    } as EmailResponse;
  } else {
    return {
      success: true,
      message: {
        messageId: result.messageId,
        messageStatus: result.response,
      },
      recepient,
    } as EmailResponse;
  }
};

export default sendEmail;
