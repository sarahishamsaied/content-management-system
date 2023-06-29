import joi from "joi";

const likeValidation = joi.object({
  post_id: joi.string().required(),
  user_id: joi.string().required(),
});

export default likeValidation;
