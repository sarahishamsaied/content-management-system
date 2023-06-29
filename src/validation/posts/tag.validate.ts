import joi from "joi";

const tagValidation = joi.object({
  name: joi.string().required(),
});

export default tagValidation;
