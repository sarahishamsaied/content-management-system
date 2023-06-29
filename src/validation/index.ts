import loginValidation from "./auth/login.validate";
import signUpValidation from "./auth/signup.validate";
import authenticationTokenValidation from "./auth/authenticationToken.validate.ts";
import companyValidation from "./company/company.validate";
import educationalInstitutionValidation from "./educational institutions/educationInstitution.validate";
import followValidation from "./follow/follow.validate";
import postValidation from "./posts/post.validate";
import tagValidation from "./posts/tag.validate";

/**
 * Higher-order function that creates a validation function using a Joi schema.
 *
 * @param {Object} schema - The Joi schema for validation.
 * @returns {Function} - The validation function.
 */
const validate =
  (schema: any): Function =>
  (payload: any) =>
    schema.validate(payload, { abortEarly: false, stripUnknown: true });

/**
 * Validation function for authenticating tokens.
 *
 * @type {Function}
 */
const validateAuthenticationToken: Function = validate(
  authenticationTokenValidation
);

/**
 * Validation function for login payloads.
 *
 * @type {Function}
 */
const validateLogin: Function = validate(loginValidation);

/**
 * Validation function for sign-up payloads.
 *
 * @type {Function}
 */
const validateSignUp: Function = validate(signUpValidation);

/**
 * Validation function for company payloads.
 *
 * @type {Function}
 */
const validateCompany: Function = validate(companyValidation);

/**
 * Validation function for educational institution payloads.
 *
 * @type {Function}
 */
const validateEducationalInstitution: Function = validate(
  educationalInstitutionValidation
);

/**
 * Validation function for follow payloads.
 *
 * @type {Function}
 */
const validateFollow: Function = validate(followValidation);

/**
 * Validation function for post payloads.
 *
 * @type {Function}
 */
const validatePost: Function = validate(postValidation);

/**
 * Validation function for tag payloads.
 *
 * @type {Function}
 */
const validateTag: Function = validate(tagValidation);

export {
  validateAuthenticationToken,
  validateLogin,
  validateSignUp,
  validateCompany,
  validateEducationalInstitution,
  validateFollow,
  validatePost,
  validateTag,
};
