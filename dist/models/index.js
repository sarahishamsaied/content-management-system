"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const comment_1 = __importDefault(require("./comment"));
const company_1 = __importDefault(require("./company"));
const diploma_1 = __importDefault(require("./diploma"));
const education_institution_1 = __importDefault(require("./education_institution"));
const education_institution_user_1 = __importDefault(require("./education_institution_user"));
const follow_1 = __importDefault(require("./follow"));
const like_1 = __importDefault(require("./like"));
const major_1 = __importDefault(require("./major"));
const post_1 = __importDefault(require("./post"));
const school_1 = __importDefault(require("./school"));
const tag_post_1 = __importDefault(require("./tag_post"));
const tag_1 = __importDefault(require("./tag"));
const university_1 = __importDefault(require("./university"));
const user_university_1 = __importDefault(require("./user_university"));
const user_diploma_1 = __importDefault(require("./user_diploma"));
const user_school_1 = __importDefault(require("./user_school"));
const user_company_1 = __importDefault(require("./user_company"));
exports.default = {
    User: user_1.default,
    Comment: comment_1.default,
    Company: company_1.default,
    Diploma: diploma_1.default,
    EducationInstitution: education_institution_1.default,
    EducationInstitutionUser: education_institution_user_1.default,
    Follow: follow_1.default,
    Like: like_1.default,
    Major: major_1.default,
    Post: post_1.default,
    School: school_1.default,
    TagPost: tag_post_1.default,
    Tag: tag_1.default,
    University: university_1.default,
    UserUniversity: user_university_1.default,
    UserDiploma: user_diploma_1.default,
    UserSchool: user_school_1.default,
    UserCompany: user_company_1.default,
};
