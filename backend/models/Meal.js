import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  recipe: { type: String, required: false },
  category: {
    type: String,
    enum: ["breakfast", "lunch", "dinner"],
    required: true,
  },
  calories: { type: Number },
  image: { type: String },
});

const Meal = mongoose.model("Meal", MealSchema);
export default Meal;
