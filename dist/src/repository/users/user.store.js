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
const user_1 = __importDefault(require("../../../models/user"));
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
                throw new Error(`Could not find users. Error: ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (yield user_1.default.findByPk(id));
                return user ? user : {};
            }
            catch (error) {
                throw new Error(`Could not find user ${id}. Error: ${error}`);
            }
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newUser = yield user_1.default.create(user);
                return newUser;
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
