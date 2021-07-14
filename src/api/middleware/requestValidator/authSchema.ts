import Joi from 'joi';

export default {
  signUp: Joi.object({
    name: Joi.string().required(),
    dateOfBirth: Joi.string().required(),
    email: Joi.string()
      .pattern(
        /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/
      )
      .required(),
    password: Joi.string().min(8).required(),
  }),
  signIn: Joi.object({
    email: Joi.string()
      .pattern(
        /^(\D)+(\w)*((\.(\w)+)?)+@(\D)+(\w)*((\.(\D)+(\w)*)+)?(\.)[a-z]{2,}$/
      )
      .required(),
    password: Joi.string().min(8).required(),
  }),
};
