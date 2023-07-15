"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const transporter = nodemailer_1.default.createTransport({
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
const sendEmail = (recepient, templatePath, data, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject, message } = data;
    const html = yield ejs_1.default.renderFile(templatePath, {
        message,
        verificationLink: `${process.env.BASE_URL}/users/verify/${token}`,
    }, { async: true });
    const mailOptions = {
        from: process.env.CMS_EMAIL,
        to: recepient,
        subject,
        html,
    };
    const result = yield transporter.sendMail(mailOptions);
    if (result.rejected.length > 0) {
        console.log(result);
        return {
            success: false,
            message: result.rejected,
            recepient,
        };
    }
    else {
        return {
            success: true,
            message: {
                messageId: result.messageId,
                messageStatus: result.response,
            },
            recepient,
        };
    }
});
exports.default = sendEmail;
