import joi from "joi";

const authenticationTokenValidation = joi.object({
  token: joi.string().required(),
});

export default authenticationTokenValidation;
