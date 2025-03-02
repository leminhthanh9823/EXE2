import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  menuId: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: false },
  menuPackage: { type: String, enum: ["7-day", "10-day"], required: true },
  days: [
    {
      day: { type: Number, required: true },
      meals: {
        breakfast: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
        lunch: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
        dinner: { type: mongoose.Schema.Types.ObjectId, ref: "Meal" },
      },
    },
  ],
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  isDefault: { type: Boolean, default: true },
});

const Menu = mongoose.model("Menu", MenuSchema);
export default Menu;
