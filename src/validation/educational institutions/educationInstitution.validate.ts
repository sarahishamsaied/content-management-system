import joi from "joi";

const educationalInstitutionValidation = joi.object({
  name: joi.string().min(3).required(),
  description: joi.string().min(3).required(),
  address: joi.string().min(3).required(),
  phone: joi.string().min(3).required(),
  email: joi.string().email().required(),
  country: joi.string().required(),
  city: joi.string().required(),
});

export default educationalInstitutionValidation;
