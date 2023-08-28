import Joi from "joi";

const addFavoriteSchema = Joi.object({
	id: Joi.string().required(),
})

export default addFavoriteSchema