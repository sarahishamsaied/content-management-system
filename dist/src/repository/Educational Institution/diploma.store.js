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
const sequelize_config_1 = __importDefault(require("../../../config/sequelize.config"));
const diploma_1 = __importDefault(require("../../../models/diploma"));
const education_institution_1 = __importDefault(require("../../../models/education_institution"));
class DiplomaStore {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diploma = yield diploma_1.default.findAll({});
                return diploma;
            }
            catch (err) {
                throw new Error(`Could not find diplomas. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const diploma = yield diploma_1.default.findByPk(id, {
                    include: [
                        {
                            model: education_institution_1.default,
                            as: "education_institution",
                        },
                    ],
                });
                if (!diploma)
                    throw new Error(`Could not find diploma ${id}`);
                return diploma;
            }
            catch (err) {
                throw new Error(`${err}`);
            }
        });
    }
    create(diploma) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const educationInstitution = yield education_institution_1.default.create(diploma);
                const id = educationInstitution.get("id");
                const newDiploma = yield diploma_1.default.create(Object.assign(Object.assign({}, diploma), { education_institution_id: id }));
                const newDiplomaFullAttributes = Object.assign(Object.assign(Object.assign({}, newDiploma.get()), educationInstitution.get()), { id: newDiploma.education_institution_id });
                return newDiplomaFullAttributes;
            }
            catch (error) {
                throw new Error(`Error creati ng diploma: ${error}`);
            }
        });
    }
    update(id, diplomaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield sequelize_config_1.default.transaction();
            try {
                // Find the university by its ID within a transaction
                const diploma = yield diploma_1.default.findByPk(id, { transaction: t });
                // Throw an error if the diploma is not found
                if (!diploma) {
                    throw new Error(`Couldn't find diploma ${id}`);
                }
                // Find the associated education institution within the same transaction
                const educationInstitution = yield education_institution_1.default.findByPk(diploma.education_institution_id, { transaction: t });
                // Throw an error if the education institution is not found
                if (!educationInstitution) {
                    throw new Error(`Couldn't find education institution ${diploma.education_institution_id}`);
                }
                // Update the diploma and education institution with the provided data within the transaction
                yield diploma.update(diplomaData, { transaction: t });
                yield educationInstitution.update(diplomaData, { transaction: t });
                // Commit the transaction
                yield t.commit();
                // Combine the updated diploma and education institution attributes
                const diplomaFullAttributes = Object.assign(Object.assign(Object.assign({}, diploma.get()), educationInstitution.get()), { id: diploma.education_institution_id });
                return diplomaFullAttributes;
            }
            catch (error) {
                // Rollback the transaction in case of an error
                yield t.rollback();
                throw new Error(`Couldn't update university ${id}. ${error}`);
            }
        });
    }
    deleteDiploma(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield sequelize_config_1.default.transaction();
            try {
                // Find the diploma by its ID within a transaction
                const diploma = yield diploma_1.default.findByPk(id, { transaction: t });
                // Throw an error if the university is not found
                if (!diploma) {
                    throw new Error(`Couldn't find diploma ${id}`);
                }
                // Find the associated education institution within the same transaction
                const educationInstitution = yield education_institution_1.default.findByPk(diploma.education_institution_id, { transaction: t });
                // Throw an error if the education institution is not found
                if (!educationInstitution) {
                    throw new Error(`Couldn't find education institution ${diploma.education_institution_id}`);
                }
                // Delete the diploma and education institution within the transaction
                yield diploma.destroy({ transaction: t });
                yield educationInstitution.destroy({ transaction: t });
                // Commit the transaction
                yield t.commit();
            }
            catch (error) {
                // Rollback the transaction in case of an error
                t.rollback();
                throw new Error(`Couldn't delete diploma ${id}. ${error}`);
            }
        });
    }
}
exports.default = DiplomaStore;
