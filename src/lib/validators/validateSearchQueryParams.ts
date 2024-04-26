import Joi from 'joi';

const searchQueryParams = Joi.object().keys({
  keyword: Joi.string().required(),
  stopped: Joi.boolean(),
  page: Joi.number().min(1),
});

const validator = (schema: any) => (payload: any) =>
  schema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

export const validateSearchQueryParams = validator(searchQueryParams);