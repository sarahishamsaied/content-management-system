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
exports.deleteSchool = exports.update = exports.show = exports.create = exports.index = void 0;
const school_store_1 = __importDefault(require("../../repository/Educational Institution/school.store"));
const validation_1 = require("../../validation");
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schoolStore = new school_store_1.default();
        const schools = yield schoolStore.index();
        res.status(200).json({ schools });
    }
    catch (error) {
        res.status(401).json({ message: error });
    }
});
exports.index = index;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, address, phone_number, email, country, city } = req.body;
        const { error, value } = yield (0, validation_1.validateEducationalInstitution)({
            name,
            description,
            address,
            phone_number,
            email,
            country,
            city,
        });
        if (error)
            return res.status(401).json({ message: error.message });
        const schoolStore = new school_store_1.default();
        const school = yield schoolStore.create(req.body);
        res.status(200).json(school);
    }
    catch (error) {
        res.status(401).json({ message: error });
    }
});
exports.create = create;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schoolStore = new school_store_1.default();
        const school = yield schoolStore.show(Number(req.params.id));
        res.status(200).json(school);
    }
    catch (error) {
        res.status(401).json({ message: error });
    }
});
exports.show = show;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schoolStore = new school_store_1.default();
        const school = yield schoolStore.update(Number(req.params.id), req.body);
        res.status(200).json(school);
    }
    catch (error) {
        res.status(401).json({ message: error });
    }
});
exports.update = update;
const deleteSchool = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const schoolStore = new school_store_1.default();
        const school = yield schoolStore.delete(Number(req.params.id));
        res.status(200).json(school);
    }
    catch (error) {
        res.status(401).json({ message: error });
    }
});
exports.deleteSchool = deleteSchool;
