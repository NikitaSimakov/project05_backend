import Joi from "joi";


const addRecipeSchema = Joi.object({
	name: Joi.string().required(),
	category: Joi.string().valid("Homemade Liqueur", "Beer", "Shake", "Punch/Party Drink", "Soft Drink", "Cocoa", "Ordinary Drink", "Shot", "Cocktail", "Other/Unknown", "Coffee/Tea"),
	glass: Joi.string().valid("Highball glass", "Cocktail glass", "Old-fashioned glass", "Whiskey Glass", "Collins glass", "Pousse cafe glass", "Champagne flute", "Whiskey sour glass", "Cordial glass", "Brandy snifter", "White wine glass", "Nick and Nora Glass", "Hurricane glass", "Coffee mug", "Shot glass", "Jar", "Irish coffee cup", "Punch bowl", "Pitcher", "Pint glass", "Copper Mug", "Wine Glass", "Beer mug", "Margarita/Coupette glass", "Beer pilsner", "Beer Glass", "Parfait glass", "Mason jar", "Margarita glass", "Martini Glass", "Balloon Glass", "Coupe Glass"),
	recipePreparation: Joi.string().required(),
	photoUrl: Joi.string(),
	ingredients: Joi.array().min(1).items({
		title: Joi.string().required(),
		measure: Joi.string().required(),
		ingredientThumb: Joi.string().required(),
		thumbMedium: Joi.string().required(),
		thumbSmall: Joi.string().required()
	}).required()
})

export default { addRecipeSchema }