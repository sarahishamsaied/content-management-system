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
exports.login = exports.deactivate = exports.show = exports.create = exports.index = void 0;
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
        res.status(400).json({ message: error.message });
    }
});
exports.create = create;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userStore = new user_store_1.default();
        const user = yield userStore.show(parseInt(req.params.id));
        console.log("=============== user is ================", user);
        res.json(user);
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
exports.show = show;
const deactivate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userStore = new user_store_1.default();
        const deleted = yield userStore.delete(parseInt(id));
        res.json({ message: "User deleted successfully" });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
});
exports.deactivate = deactivate;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userStore = new user_store_1.default();
        const user = yield userStore.authenticate(email, password);
        console.log("user");
        console.log(user.password);
        // generate token
        const token = yield userStore.generateAuthToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
        });
        console.log(res.cookie.toString());
        res.json({ token });
        // Set token in cookie
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
});
exports.login = login;
