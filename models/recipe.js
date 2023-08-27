import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";

const favoriteInSchema = new Schema({
	userId: {
		type: String
	}
}, { _id: false })

const ingredientsSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	measure: {
		type: String,
		required: true
	},
	ingredientThumb: {
		type: String,
		required: true
	},
	thumbMedium: {
		type: String,
		required: true
	},
	thumbSmall: {
		type: String,
		required: true
	},
}, { _id: false })

const recipeSchema = new Schema({
	name: {
		type: String,
		required: [true, "Set recipe name"]
	},
	category: {
		type: String,
		enum: ["Homemade Liqueur", "Beer", "Shake", "Punch/Party Drink", "Soft Drink", "Cocoa", "Ordinary Drink", "Shot", "Cocktail", "Other/Unknown", "Coffee/Tea"],
		default: "Cocktail"
	},
	glass: {
		type: String,
		enum: ["Highball glass", "Cocktail glass", "Old-fashioned glass", "Whiskey Glass", "Collins glass", "Pousse cafe glass", "Champagne flute", "Whiskey sour glass", "Cordial glass", "Brandy snifter", "White wine glass", "Nick and Nora Glass", "Hurricane glass", "Coffee mug", "Shot glass", "Jar", "Irish coffee cup", "Punch bowl", "Pitcher", "Pint glass", "Copper Mug", "Wine Glass", "Beer mug", "Margarita/Coupette glass", "Beer pilsner", "Beer Glass", "Parfait glass", "Mason jar", "Margarita glass", "Martini Glass", "Balloon Glass", "Coupe Glass"],
		default: "Cocktail glass",
	},
	recipePreparation: {
		type: String,
		required: [true, "You should write recipe preparation"]
	},
	creatorId: {
		type: String,
		required: [true, "Add user id!"]
	},
	favoriteIn: [favoriteInSchema],
	ingredients: [ingredientsSchema],
}, { versionKey: false, timestamps: true })

ingredientsSchema.pre("findOneAndUpdate", handleUpdateValidate)
ingredientsSchema.post("save", handleSaveError)
ingredientsSchema.post("findOneAndUpdate", handleSaveError)

export const Recipe = model('recipes', recipeSchema)