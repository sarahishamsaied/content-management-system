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
exports.update = exports.show = exports.create = exports.index = void 0;
const university_store_1 = __importDefault(require("../../repository/Educational Institution/university.store"));
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universityStore = new university_store_1.default();
        const universities = yield universityStore.index();
        res.status(200).json({ universities });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.index = index;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universityStore = new university_store_1.default();
        const university = yield universityStore.create(req.body);
        console.log("university: ", university);
        res.status(200).json(university);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.create = create;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universityStore = new university_store_1.default();
        const university = yield universityStore.show(Number(req.params.id));
        res.status(200).json(university);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.show = show;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const universityStore = new university_store_1.default();
        const university = yield universityStore.update(Number(req.params.id), req.body);
        res.status(200).json(university);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.update = update;
