import { Schema, model } from "mongoose";
import { handleSaveError, handleUpdateValidate } from "./hooks.js";

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
	"thumb-medium": {
		type: String,
		required: true
	},
	"thumb-small": {
		type: String,
		required: true
	},
}, { _id: false })

const recipeSchema = new Schema(
	{
		drink: {
			type: String,
			required: true,
		},
		drinkAlternate: { type: String, default: null },
		tags: { type: String, default: null },
		video: { type: String, default: null },
		category: {
			type: String,
			enum: ["Homemade Liqueur", "Beer", "Punch / Party Drink", "Soft Drink", "Shake", "Ordinary Drink", "Shot", "Cocktail", "Other/Unknown", "Coffee / Tea", "Cocoa"],
			default: "Cocktail"
		},
		IBA: { type: String, default: null },
		alcoholic: { type: String, default: null },
		glass: {
			type: String,
			enum: ["Highball glass", "Cocktail glass", "Old-fashioned glass", "Whiskey Glass", "Collins glass", "Pousse cafe glass", "Champagne flute", "Whiskey sour glass", "Cordial glass", "Brandy snifter", "White wine glass", "Nick and Nora Glass", "Hurricane glass", "Coffee mug", "Shot glass", "Jar", "Irish coffee cup", "Punch bowl", "Pitcher", "Pint glass", "Copper Mug", "Wine Glass", "Beer mug", "Margarita/Coupette glass", "Beer pilsner", "Beer Glass", "Parfait glass", "Mason jar", "Margarita glass", "Martini Glass", "Balloon Glass", "Coupe Glass"],
			default: "Cocktail glass",
		},
		instructions: String,
		drinkThumb: String,
		describe: String,
		creatorId: String,
		ingredients: [ingredientsSchema],
		usersId: Array,
	},
	{ versionKey: false, timestamps: true }
);

ingredientsSchema.pre("findOneAndUpdate", handleUpdateValidate)
ingredientsSchema.post("save", handleSaveError)
ingredientsSchema.post("findOneAndUpdate", handleSaveError)


const Recipe = model("cocktail", recipeSchema);
export default Recipe;
