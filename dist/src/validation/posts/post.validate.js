"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const postValidation = joi_1.default.object({
    author_id: joi_1.default.string().required(),
    body: joi_1.default.string().required(),
});
exports.default = postValidation;
