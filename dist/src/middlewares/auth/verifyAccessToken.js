"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validation_1 = require("../../validation");
const http_errors_1 = __importDefault(require("http-errors"));
const verifyAccessToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const { error, value } = (0, validation_1.validateAuthenticationToken)(authHeader);
        if (error)
            throw http_errors_1.default.Unauthorized("Invalid token");
        const token = authHeader.split(" ")[1];
        jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
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
