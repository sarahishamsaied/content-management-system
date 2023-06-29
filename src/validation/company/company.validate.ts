import joi from "joi";

const companyValidation = joi.object({
  name: joi.string().min(3).required(),
  description: joi.string().min(3).required(),
  address: joi.string().min(3).required(),
  phone: joi.string().min(3).required(),
  email: joi.string().email().required(),
});

export default companyValidation;
