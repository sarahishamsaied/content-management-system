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
const university_1 = __importDefault(require("../../../models/university"));
const education_institution_1 = __importDefault(require("../../../models/education_institution"));
class UniversityStore {
    /**
     * Retrieves a list of all universities with their associated education institutions.
     *
     * @returns {Promise<University[]>} A promise that resolves to an array of universities.
     * @throws {Error} If an error occurs while retrieving the universities.
     */
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all universities and include the associated education institutions
                const universities = (yield university_1.default.findAll({
                    include: [
                        {
                            model: education_institution_1.default,
                            as: "education_institution",
                        },
                    ],
                }));
                return universities;
            }
            catch (error) {
                throw new Error(`An error occurred while retrieving the universities. ${error}`);
            }
        });
    }
    /**
     * Creates a new university with the associated education institution.
     *
     * @param {UniversityAttributes} university - The university attributes.
     * @returns {Promise<UniversityAttributes>} A promise that resolves to the created university attributes.
     * @throws {Error} If an error occurs while creating the university.
     */
    create(university) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a new education institution
                const educationInstitution = yield education_institution_1.default.create(university);
                // Get the ID of the created education institution
                const id = educationInstitution.get("id");
                // Create a new university with the education_institution_id
                const newUniversity = yield university_1.default.create({
                    education_institution_id: id,
                });
                // Combine the attributes of the new university and education institution
                const newUniversityFullAttributes = Object.assign(Object.assign(Object.assign({}, newUniversity.get()), educationInstitution.get()), { id });
                console.log("newUniversityFullAttributes: ", newUniversityFullAttributes);
                return newUniversityFullAttributes;
            }
            catch (error) {
                throw new Error(`An error occurred while creating the university. ${error}`);
            }
        });
    }
    /**
     * Retrieves a specific university by its ID with the associated education institution.
     *
     * @param {number} id - The ID of the university to retrieve.
     * @returns {Promise<UniversityAttributes>} A promise that resolves to the university attributes.
     * @throws {Error} If the university is not found or an error occurs while retrieving it.
     */
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the university by its ID and include the associated education institution
                const university = yield university_1.default.findByPk(id, {
                    include: [
                        {
                            model: education_institution_1.default,
                            as: "education_institution",
                        },
                    ],
                });
                // Throw an error if the university is not found
                if (!university) {
                    throw new Error(`Couldn't find university ${id}`);
                }
                // Get the plain object representation of the university attributes
                const universityData = university.get({
                    plain: true,
                });
                return universityData;
            }
            catch (error) {
                throw new Error(`Couldn't find university ${id}. ${error}`);
            }
        });
    }
    /**
     * Updates a specific university and its associated education institution.
     *
     * @param {number} id - The ID of the university to update.
     * @param {Partial<UniversityAttributes>} universityData - The updated university attributes.
     * @returns {Promise<UniversityAttributes>} A promise that resolves to the updated university attributes.
     * @throws {Error} If the university or its associated education institution is not found,
     *                or an error occurs while updating them.
     */
    update(id, universityData) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield sequelize_config_1.default.transaction();
            try {
                // Find the university by its ID within a transaction
                const university = yield university_1.default.findByPk(id, { transaction: t });
                // Throw an error if the university is not found
                if (!university) {
                    throw new Error(`Couldn't find university ${id}`);
                }
                // Find the associated education institution within the same transaction
                const educationInstitution = yield education_institution_1.default.findByPk(university.education_institution_id, { transaction: t });
                // Throw an error if the education institution is not found
                if (!educationInstitution) {
                    throw new Error(`Couldn't find education institution ${university.education_institution_id}`);
                }
                // Update the university and education institution with the provided data within the transaction
                yield university.update(universityData, { transaction: t });
                yield educationInstitution.update(universityData, { transaction: t });
                // Commit the transaction
                yield t.commit();
                // Combine the updated university and education institution attributes
                const universityFullAttributes = Object.assign(Object.assign(Object.assign({}, university.get()), educationInstitution.get()), { id: university.education_institution_id });
                return universityFullAttributes;
            }
            catch (error) {
                // Rollback the transaction in case of an error
                yield t.rollback();
                throw new Error(`Couldn't update university ${id}. ${error}`);
            }
        });
    }
    /**
     * Deletes a specific university and its associated education institution.
     *
     * @param {number} id - The ID of the university to delete.
     * @returns {Promise<void>} A promise that resolves when the university is deleted successfully.
     * @throws {Error} If the university or its associated education institution is not found,
     *                or an error occurs while deleting them.
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield sequelize_config_1.default.transaction();
            try {
                // Find the university by its ID within a transaction
                const university = yield university_1.default.findByPk(id, { transaction: t });
                // Throw an error if the university is not found
                if (!university) {
                    throw new Error(`Couldn't find university ${id}`);
                }
                // Find the associated education institution within the same transaction
                const educationInstitution = yield education_institution_1.default.findByPk(university.education_institution_id, { transaction: t });
                // Throw an error if the education institution is not found
                if (!educationInstitution) {
                    throw new Error(`Couldn't find education institution ${university.education_institution_id}`);
                }
                // Delete the university and education institution within the transaction
                yield university.destroy({ transaction: t });
                yield educationInstitution.destroy({ transaction: t });
                // Commit the transaction
                yield t.commit();
            }
            catch (error) {
                // Rollback the transaction in case of an error
                t.rollback();
                throw new Error(`Couldn't delete university ${id}. ${error}`);
            }
        });
    }
}
exports.default = UniversityStore;
