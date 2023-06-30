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
exports.deleteCompany = exports.update = exports.show = exports.create = exports.index = void 0;
const company_store_1 = __importDefault(require("../../repository/companies/company.store"));
const index = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyStore = new company_store_1.default();
        const companies = yield companyStore.index();
        res.status(200).json({ companies });
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    }
});
exports.index = index;
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyStore = new company_store_1.default();
        const company = yield companyStore.create(req.body);
        console.log("company: ", company);
        res.status(200).json(company);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.create = create;
const show = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyStore = new company_store_1.default();
        const company = yield companyStore.show(Number(req.params.id));
        res.status(200).json(company);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.show = show;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyStore = new company_store_1.default();
        const company = yield companyStore.update(Number(req.params.id), req.body);
        res.status(200).json(company);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.update = update;
const deleteCompany = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyStore = new company_store_1.default();
        const company = yield companyStore.deleteCompany(Number(req.params.id));
        res.status(200).json(company);
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.deleteCompany = deleteCompany;
