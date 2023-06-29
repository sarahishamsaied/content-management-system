import joi from "joi";

const commentValidation = joi.object({
  post_id: joi.string().required(),
  author_id: joi.string().required(),
  body: joi.string().required(),
});

export default commentValidation;
