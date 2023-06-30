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
const education_institution_1 = __importDefault(require("../../../models/education_institution"));
const school_1 = __importDefault(require("../../../models/school"));
class SchoolStore {
    /**
     * Retrieves a list of all schools.
     *
     * @returns {Promise<School[]>} A promise that resolves to an array of schools.
     * @throws {Error} If an error occurs while retrieving the schools.
     */
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all schools
                const schools = (yield school_1.default.findAll({}));
                console.log("schools are: ", schools);
                return schools;
            }
            catch (error) {
                throw new Error(`Could not find schools. ${error}`);
            }
        });
    }
    /**
     * Retrieves a specific school by its ID with the associated education institution.
     *
     * @param {number} id - The ID of the school to retrieve.
     * @returns {Promise<School>} A promise that resolves to the school object.
     * @throws {Error} If the school is not found or an error occurs while retrieving it.
     */
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the school by its ID and include the associated education institution
                const school = (yield school_1.default.findByPk(id, {
                    include: [
                        {
                            model: education_institution_1.default,
                            as: "education_institution",
                        },
                    ],
                }));
                // Throw an error if the school is not found
                if (!school) {
                    throw new Error(`Could not find school ${id}`);
                }
                return school;
            }
            catch (error) {
                throw new Error(`Could not find school ${id}.`);
            }
        });
    }
    /**
     * Creates a new school with the associated education institution.
     *
     * @param {SchoolAttributes} school - The school attributes.
     * @returns {Promise<SchoolAttributes>} A promise that resolves to the created school attributes.
     * @throws {Error} If an error occurs while creating the school.
     */
    create(school) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield sequelize_config_1.default.transaction();
            try {
                // Create a new education institution
                const educationInstitution = (yield education_institution_1.default.create(school));
                // Create a new school with the associated education institution ID
                let newSchool = yield school_1.default.create(Object.assign(Object.assign({}, school), { education_institution_id: educationInstitution.get("id") }), {
                    include: [
                        {
                            model: education_institution_1.default,
                            as: "education_institution",
                        },
                    ],
                });
                // Combine the attributes of the new school and education institution
                const newSchoolAttributes = Object.assign(Object.assign(Object.assign({}, newSchool.get()), educationInstitution.get()), { id: educationInstitution.get("id") });
                t.commit();
                return newSchoolAttributes;
            }
            catch (error) {
                console.log("error is: ", error);
                t.rollback();
                throw new Error(`Could not create new school. ${error}`);
            }
        });
    }
    /**
     * Updates a specific school.
     *
     * @param {number} id - The ID of the school to update.
     * @param {SchoolAttributes} school - The updated school attributes.
     * @returns {Promise<SchoolAttributes>} A promise that resolves to the updated school attributes.
     * @throws {Error} If the school is not found or an error occurs while updating it.
     */
    update(id, school) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield sequelize_config_1.default.transaction();
            try {
                // Find the school by its ID
                const schoolToUpdate = (yield school_1.default.findByPk(id));
                // Throw an error if the school is not found
                if (!schoolToUpdate) {
                    throw new Error(`Could not find school ${id}.`);
                }
                // Update the school with the provided attributes
                const updatedSchool = yield schoolToUpdate.update(school);
                // Get the updated school attributes
                const updatedSchoolAttributes = updatedSchool.get();
                t.commit();
                return updatedSchoolAttributes;
            }
            catch (error) {
                t.rollback();
                throw new Error(`Could not update school ${id}. ${error}`);
            }
        });
    }
    /**
     * Deletes a specific school.
     *
     * @param {number} id - The ID of the school to delete.
     * @returns {Promise<SchoolAttributes>} A promise that resolves to the deleted school attributes.
     * @throws {Error} If the school is not found or an error occurs while deleting it.
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const t = yield sequelize_config_1.default.transaction();
            try {
                // Find the school by its ID
                const schoolToDelete = (yield school_1.default.findByPk(id));
                const educationInstitution = (yield education_institution_1.default.findByPk(id));
                // Delete the education institution
                yield educationInstitution.destroy();
                // Throw an error if the school is not found
                if (!schoolToDelete) {
                    throw new Error(`Could not find school ${id}.`);
                }
                // Get the attributes of the school to delete
                const schoolToDeleteAttributes = schoolToDelete.get();
                // Delete the school
                yield schoolToDelete.destroy();
                t.commit();
                return schoolToDeleteAttributes;
            }
            catch (error) {
                t.rollback();
                throw new Error(`Could not delete school ${id}. ${error}`);
            }
        });
    }
}
exports.default = SchoolStore;
