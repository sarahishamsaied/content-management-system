import joi from "joi";

const postValidation = joi.object({
  author_id: joi.number().required(),
  body: joi.string().required(),
});

export default postValidation;
