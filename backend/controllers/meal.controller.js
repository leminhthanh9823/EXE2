import Meal from "../models/Meal.js";

// Tạo một món ăn mới
export const createMeal = async (req, res) => {
  try {
    const { name, description, category, calories, image, recipe } = req.body;

    const newMeal = new Meal({
      name,
      description,
      category,
      calories,
      image,
      recipe,
    });

    await newMeal.save();
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi tạo món ăn" });
  }
};

// Lấy danh sách tất cả món ăn
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.json(meals);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách món ăn" });
  }
};

export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: "Không tìm thấy món ăn" });
    res.json(meal);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy chi tiết món ăn" });
  }
};

export const updateMeal = async (req, res) => {
  try {
    const { name, description, recipe, category, calories, image } = req.body;
    const updatedMeal = await Meal.findByIdAndUpdate(
      req.params.id,
      { name, description, recipe, category, calories, image },
      { new: true }
    );
    if (!updatedMeal) return res.status(404).json({ error: "Không tìm thấy món ăn" });

    res.json({ success: true, message: "Cập nhật thành công", meal: updatedMeal });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi cập nhật món ăn" });
  }
};

export const deleteMeal = async (req, res) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
    if (!deletedMeal) return res.status(404).json({ error: "Không tìm thấy món ăn" });

    res.json({ success: true, message: "Món ăn đã được xóa" });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi xóa món ăn" });
  }
};
