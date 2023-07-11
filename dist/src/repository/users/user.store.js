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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../../models/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield user_1.default.findAll({});
                console.log("users are: ", users);
                if (users)
                    return users;
                return [];
            }
            catch (error) {
                console.log(error);
                throw new Error(`Could not find users. ${error}`);
            }
        });
    }
    generateAuthToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("user issss");
                const token = jsonwebtoken_1.default.sign(user.dataValues, process.env.TOKEN_SECRET);
                return token;
            }
            catch (error) {
                throw new Error(`Could not generate token. ${error}`);
            }
        });
    }
    authenticate(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundUser = yield user_1.default.findOne({ where: { email: email } });
                if (!foundUser)
                    throw new Error(`Could not find user ${email}`);
                if (!bcrypt_1.default.compareSync(password, foundUser.password))
                    throw new Error(`Password is incorrect`);
                console.log("found user is", foundUser);
                return foundUser;
            }
            catch (error) {
                console.log(error);
                throw new Error(`Could not authenticate user ${email}. Error: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield user_1.default.findByPk(id));
                if (!user)
                    throw new Error(`Could not find user ${id}`);
                return user;
            }
            catch (error) {
                throw new Error(`Could not find user ${id}. Error: ${error}`);
            }
        });
    }
    emailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = (yield user_1.default.findOne({
                where: { email: email },
            }));
            return user ? true : false;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("user is", user);
                const doesEmailExist = yield this.emailExists(user.email);
                if (doesEmailExist)
                    throw new Error(`Email ${user.email} already exists`);
                const newUser = yield user_1.default.create(user);
                const _a = newUser.dataValues, { password } = _a, userWithoutPassword = __rest(_a, ["password"]);
                return userWithoutPassword;
            }
            catch (error) {
                throw new Error(`Could not create new user. Error: ${error}`);
            }
        });
    }
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToUpdate = (yield user_1.default.findByPk(id));
                if (!userToUpdate)
                    throw new Error(`Could not find user ${id}`);
                const updatedUser = yield userToUpdate.update(user);
                return updatedUser;
            }
            catch (error) {
                throw new Error(`Could not update user ${id}. Error: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userToDelete = (yield user_1.default.findByPk(id));
                if (!userToDelete)
                    throw new Error(`Could not find user ${id}`);
                yield userToDelete.destroy();
            }
            catch (error) {
                throw new Error(`Could not delete user ${id}. Error: ${error}`);
            }
        });
    }
}
exports.default = UserStore;
