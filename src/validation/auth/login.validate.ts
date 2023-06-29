import joi from "joi";

const loginValidation = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

export default loginValidation;
