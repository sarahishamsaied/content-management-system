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
exports.deleteDiploma = exports.update = exports.show = exports.create = exports.index = void 0;
const diploma_store_1 = __importDefault(require("../../repository/Educational Institution/diploma.store"));
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diplomaStore = new diploma_store_1.default();
        const diplomas = yield diplomaStore.index();
        res.status(200).json({ diplomas });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.index = index;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diplomaStore = new diploma_store_1.default();
        const diploma = yield diplomaStore.create(req.body);
        console.log("diploma: ", diploma);
        res.status(200).json(diploma);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.create = create;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diplomaStore = new diploma_store_1.default();
        const diploma = yield diplomaStore.show(Number(req.params.id));
        res.status(200).json(diploma);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.show = show;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diplomaStore = new diploma_store_1.default();
        const diploma = yield diplomaStore.update(Number(req.params.id), req.body);
        res.status(200).json(diploma);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.update = update;
const deleteDiploma = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const diplomaStore = new diploma_store_1.default();
        const diploma = yield diplomaStore.deleteDiploma(Number(req.params.id));
        res.status(200).json({ message: "Diploma deleted successfully" });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.deleteDiploma = deleteDiploma;
