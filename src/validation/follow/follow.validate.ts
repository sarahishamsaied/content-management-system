import joi from "joi";

const followValidation = joi.object({
  follower_id: joi.string().required(),
  following_id: joi.string().required(),
});

export default followValidation;
