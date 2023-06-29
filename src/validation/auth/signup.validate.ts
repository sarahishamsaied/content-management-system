import joi from "joi";

const signupValidation = joi.object({
  first_name: joi.string().min(3).required(),
  last_name: joi.string().min(3).required(),
  username: joi
    .string()
    .min(3)
    .required()
    .regex(/^[a-zA-Z0-9_]+$/)
    .messages({
      "string.pattern.base":
        "Username can only contain letters, numbers and underscores",
    }),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  country: joi.string(),
  city: joi.string(),
});

export default signupValidation;
