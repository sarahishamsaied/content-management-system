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
const university_1 = __importDefault(require("../../../models//university"));
const education_institution_1 = __importDefault(require("../../../models/education_institution"));
class UniversityStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const universities = yield university_1.default.findAll({});
                return universities;
            }
            catch (error) {
                throw new Error(`An Error Occurred. ${error}`);
            }
        });
    }
    create(university) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const educationInstitution = yield education_institution_1.default.create(university);
                const id = educationInstitution.get("id");
                const newUniversity = yield university_1.default.create({
                    education_institution_id: id,
                });
                return newUniversity;
            }
            catch (error) {
                throw new Error(`An Error Occurred. ${error}`);
            }
        });
    }
}
exports.default = UniversityStore;
