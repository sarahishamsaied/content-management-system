"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTag = exports.validatePost = exports.validateFollow = exports.validateEducationalInstitution = exports.validateCompany = exports.validateSignUp = exports.validateLogin = exports.validateAuthenticationToken = void 0;
const login_validate_1 = __importDefault(require("./auth/login.validate"));
const signup_validate_1 = __importDefault(require("./auth/signup.validate"));
const authenticationToken_validate_ts_1 = __importDefault(require("./auth/authenticationToken.validate.ts"));
const company_validate_1 = __importDefault(require("./company/company.validate"));
const educationInstitution_validate_1 = __importDefault(require("./educational institutions/educationInstitution.validate"));
const follow_validate_1 = __importDefault(require("./follow/follow.validate"));
const post_validate_1 = __importDefault(require("./posts/post.validate"));
const tag_validate_1 = __importDefault(require("./posts/tag.validate"));
/**
 * Higher-order function that creates a validation function using a Joi schema.
 *
 * @param {Object} schema - The Joi schema for validation.
 * @returns {Function} - The validation function.
 */
const validate = (schema) => (payload) => schema.validate(payload, { abortEarly: false, stripUnknown: true });
/**
 * Validation function for authenticating tokens.
 *
 * @type {Function}
 */
const validateAuthenticationToken = validate(authenticationToken_validate_ts_1.default);
exports.validateAuthenticationToken = validateAuthenticationToken;
/**
 * Validation function for login payloads.
 *
 * @type {Function}
 */
const validateLogin = validate(login_validate_1.default);
exports.validateLogin = validateLogin;
/**
 * Validation function for sign-up payloads.
 *
 * @type {Function}
 */
const validateSignUp = validate(signup_validate_1.default);
exports.validateSignUp = validateSignUp;
/**
 * Validation function for company payloads.
 *
 * @type {Function}
 */
const validateCompany = validate(company_validate_1.default);
exports.validateCompany = validateCompany;
/**
 * Validation function for educational institution payloads.
 *
 * @type {Function}
 */
const validateEducationalInstitution = validate(educationInstitution_validate_1.default);
exports.validateEducationalInstitution = validateEducationalInstitution;
/**
 * Validation function for follow payloads.
 *
 * @type {Function}
 */
const validateFollow = validate(follow_validate_1.default);
exports.validateFollow = validateFollow;
/**
 * Validation function for post payloads.
 *
 * @type {Function}
 */
const validatePost = validate(post_validate_1.default);
exports.validatePost = validatePost;
/**
 * Validation function for tag payloads.
 *
 * @type {Function}
 */
const validateTag = validate(tag_validate_1.default);
exports.validateTag = validateTag;
