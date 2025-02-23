import mongoose from "mongoose";

const FoodLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  menuId: { type: String, required: false },
  date: { type: String, required: true },
  meals: [
    {
      name: { type: String, required: true },
      foods: [
        {
          name: { type: String, required: true },
          filePath: { type: String, required: false }, // Store file path
        },
      ],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const FoodLog = mongoose.model("FoodLog", FoodLogSchema);
export default FoodLog;
