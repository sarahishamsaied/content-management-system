"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = require("../../validation");
const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("auth", authHeader);
    if (authHeader) {
        const { error, value } = (0, validation_1.validateAuthenticationToken)({
            token: authHeader.split(" ")[1],
        });
        if (error)
            res.status(401).json({ message: "Unauthorized Access" });
        const token = authHeader.split(" ")[1];
        console.log("token secret here->>>>>>>>>>>", process.env.TOKEN_SECRET);
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log("eeror here------------------>");
                console.log(err);
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
exports.default = verifyAccessToken;
