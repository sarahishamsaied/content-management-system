"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const authRouter = (0, express_1.Router)();
authRouter.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
authRouter.get("google/callback", passport_1.default.authenticate("google", {
    failureRedirect: "/failure",
    successRedirect: "/",
    session: false,
}), (req, res) => {
    res.send("Successfully logged in");
});
authRouter.get("/failure", (req, res) => {
    res.send("Failed to login");
});
exports.default = authRouter;
