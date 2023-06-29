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
exports.create = exports.index = void 0;
const user_store_1 = __importDefault(require("../../repository/users/user.store"));
const http_errors_1 = __importDefault(require("http-errors"));
/**
 * Get all users.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @throws {InternalServerError} - If there is an internal server error.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userStore = new user_store_1.default();
        const users = yield userStore.index();
        res.json(users);
    }
    catch (error) {
        http_errors_1.default.InternalServerError("Internal Server Error");
    }
});
exports.index = index;
/**
 * Create a new user.
 *
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @throws {InternalServerError} - If there is an internal server error.
 * @returns {Promise<void>} - A Promise that resolves to void.
 */
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const { email, password, first_name, last_name, username, country, city, bio, } = req.body;
        const user = {
            email,
            password,
            first_name,
            last_name,
            username,
            country,
            city,
            bio,
            is_verified: false,
            is_banned: false,
            two_factor_enabled: false,
            is_admin: false,
        };
        const userStore = new user_store_1.default();
        const created = yield userStore.create(user);
        res.json(created);
    }
    catch (error) {
        console.log(error);
        http_errors_1.default.InternalServerError("Internal Server Error");
    }
});
exports.create = create;
