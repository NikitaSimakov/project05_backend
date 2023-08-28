import Joi from "joi";


const addRecipeSchema = Joi.object({
	drink: Joi.string().required(),
	drinkAlternate: Joi.string(),
	tags: Joi.string(),
	video: Joi.string(),
	category: Joi.string().valid("Homemade Liqueur", "Beer", "Punch / Party Drink", "Soft Drink", "Shake", "Ordinary Drink", "Shot", "Cocktail", "Other/Unknown", "Coffee / Tea", "Cocoa"),
	IBA: Joi.string(),
	alcoholic: Joi.string(),
	glass: Joi.string().valid("Highball glass", "Cocktail glass", "Old-fashioned glass", "Whiskey Glass", "Collins glass", "Pousse cafe glass", "Champagne flute", "Whiskey sour glass", "Cordial glass", "Brandy snifter", "White wine glass", "Nick and Nora Glass", "Hurricane glass", "Coffee mug", "Shot glass", "Jar", "Irish coffee cup", "Punch bowl", "Pitcher", "Pint glass", "Copper Mug", "Wine Glass", "Beer mug", "Margarita/Coupette glass", "Beer pilsner", "Beer Glass", "Parfait glass", "Mason jar", "Margarita glass", "Martini Glass", "Balloon Glass", "Coupe Glass"),
	instructions: Joi.string().required(),
	drinkThumb: Joi.string(),
	describe: Joi.string(),
	creatorId: Joi.string(),
	ingredients: Joi.array().min(1).items({
		title: Joi.string().required(),
		measure: Joi.string().required(),
		ingredientThumb: Joi.string().required(),
		"thumb-medium": Joi.string().required(),
		"thumb-small": Joi.string().required()
	}).required()
})

export default { addRecipeSchema }