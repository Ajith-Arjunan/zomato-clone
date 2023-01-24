import Joi from "joi";

export const ValidateId = (id) => {
    const schema = Joi.object({
        _id: Joi.string().required(),
    });
    return schema.validateAsync(id);
};

export const ValidateCategory = (category) => {
    const schema = Joi.object({
        category: Joi.string().required(),
    });
    return schema.validateAsync(category);
};

export const ValidateSearchString = (searchString) => {
    const Schema = Joi.object({
        searchString: Joi.string().required(),
    });
    return Schema.validateAsync(searchString);
};