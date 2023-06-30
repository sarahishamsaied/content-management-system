"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.index = void 0;
const university_store_1 = __importDefault(require("../../repository/Educational Institution/university.store"));
const index = (req, res, next) => {
    try {
        const universityStore = new university_store_1.default();
        const universities = universityStore.index();
        res.status(200).json({ universities });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.index = index;
const create = (req, res, next) => {
    try {
        const universityStore = new university_store_1.default();
        const university = universityStore.create(req.body);
        res.status(200).json({ university });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
};
exports.create = create;
