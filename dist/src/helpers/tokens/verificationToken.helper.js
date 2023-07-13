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
exports.decodeVerificationToken = exports.generateVerificationToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateVerificationToken = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    const token = jsonwebtoken_1.default.sign({ user_id }, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
    });
    return token;
});
exports.generateVerificationToken = generateVerificationToken;
const decodeVerificationToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    return decoded;
});
exports.decodeVerificationToken = decodeVerificationToken;
exports.default = {
    generateVerificationToken: exports.generateVerificationToken,
    decodeVerificationToken: exports.decodeVerificationToken,
};
