"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const signupValidation = joi_1.default.object({
    first_name: joi_1.default.string().min(3).required(),
    last_name: joi_1.default.string().min(3).required(),
    username: joi_1.default
        .string()
        .min(3)
        .required()
        .regex(/^[a-zA-Z0-9_]+$/)
        .messages({
        "string.pattern.base": "Username can only contain letters, numbers and underscores",
    }),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().min(6).required(),
    country: joi_1.default.string(),
    city: joi_1.default.string(),
});
exports.default = signupValidation;
