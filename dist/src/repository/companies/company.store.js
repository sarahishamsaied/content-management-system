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
const company_1 = __importDefault(require("../../../models/company"));
class CompanyStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const companies = yield company_1.default.findAll({});
                return companies;
            }
            catch (error) {
                throw new Error(`An Error Occurred. ${error}`);
            }
        });
    }
    create(company) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, img_url, phone_number, address, bio } = company;
                const newCompany = yield company_1.default.create({
                    name,
                    description,
                    img_url,
                    phone_number,
                    address,
                    bio,
                });
                return newCompany;
            }
            catch (error) {
                throw new Error(`Couldn't create company. ${error}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const company = yield company_1.default.findByPk(id);
                return company;
            }
            catch (error) {
                throw new Error(`Couldn't find company. ${error}`);
            }
        });
    }
    update(id, company) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundCompany = yield company_1.default.findByPk(id);
                if (!foundCompany)
                    throw new Error(`Couldn't find company ${id}`);
                const updatedCompany = yield foundCompany.update(company);
                return updatedCompany;
            }
            catch (error) {
                throw new Error(`Couldn't update company ${id}. ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const foundCompany = yield company_1.default.findByPk(id);
                if (!foundCompany)
                    throw new Error(`Couldn't find company ${id}`);
                yield foundCompany.destroy();
                return true;
            }
            catch (error) {
                throw new Error(`Couldn't delete company ${id}. ${error}`);
            }
        });
    }
}
exports.default = CompanyStore;
