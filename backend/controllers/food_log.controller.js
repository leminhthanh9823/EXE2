import multer from "multer";
import FoodLog from "../models/food_log.model.js";
import path from "path";
import UserPoint from "../models/userPoint.model.js";
export const getFoodLogs = async (req, res) => {
  try {
    const userId = req.user.userId;

    const logs = await FoodLog.find({ userId: userId });

    console.log("log ne: ", logs);
    return res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tải dữ liệu", error });
  }
};

export const createFoodLog = async (req, res) => {
  try {
    const { userId, menuId, date, meals } = req.body;
    const parsedMeals = JSON.parse(meals); // Chuyển meals từ string JSON thành mảng
    let userPoint = await UserPoint.findOne({ userId });
    if (!userPoint) {
      userPoint = new UserPoint({ userId, points: 0 });
      await userPoint.save();
    }

    const existingLog = await FoodLog.findOne({ userId, date });
    if (existingLog) {
      return res.status(400).json({ message: "You can only log once per day" });
    }
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        const match = file.fieldname.match(/meal-(\d+)-(\d+)/); // Tìm mealIndex & foodIndex
        if (match) {
          const mealIndex = parseInt(match[1], 10);
          const foodIndex = parseInt(match[2], 10);

          if (
            parsedMeals[mealIndex] &&
            parsedMeals[mealIndex].foods[foodIndex]
          ) {
            parsedMeals[mealIndex].foods[foodIndex].filePath = path.basename(
              file.path
            ); // Lấy chỉ tên file
          }
        }
      });
    }

    // Tạo FoodLog mới và lưu vào MongoDB
    const newFoodLog = new FoodLog({
      userId,
      menuId,
      date,
      meals: parsedMeals,
    });

    await newFoodLog.save();

    userPoint.points += 100;
    await userPoint.save();
    res.status(201).json({ message: "Food log saved!", data: newFoodLog });
  } catch (error) {
    console.error("Error saving food log:", error);
    res
      .status(500)
      .json({ message: "Error saving food log", error: error.message });
  }
};

export const updateFoodLog = async (req, res) => {
  try {
    const { id } = req.params;
    const { menuId, date, meals, notes } = req.body;
    const parsedMeals = JSON.parse(meals);

    const foodLog = await FoodLog.findById(id);
    if (!foodLog) {
      return res.status(404).json({ message: "Food log not found" });
    }

    // Update food log details
    foodLog.menuId = menuId;
    foodLog.date = date;
    foodLog.meals = parsedMeals;
    foodLog.description = notes;

    // Handle file uploads
    req.files.forEach((file) => {
      const match = file.fieldname.match(/meal-(\d+)-(\d+)/);
      if (match) {
        const mealIndex = parseInt(match[1], 10);
        const foodIndex = parseInt(match[2], 10);
        foodLog.meals[mealIndex].foods[foodIndex].filePath = file.path;
      }
    });

    await foodLog.save();
    res.status(200).json({ message: "Food log updated!", data: foodLog });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating food log", error: error.message });
  }
};

export const deleteFoodLog = async (req, res) => {
  try {
    const { id } = req.params;

    // Tìm FoodLog cần xóa
    const foodLog = await FoodLog.findById(id);
    if (!foodLog) {
      return res.status(404).json({ message: "Food log not found" });
    }

    // Xóa file ảnh nếu có
    foodLog.meals.forEach((meal) => {
      meal.foods.forEach((food) => {
        if (food.filePath) {
          const filePath = `public/uploads/${food.filePath}`;
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath); // Xóa file ảnh khỏi thư mục
          }
        }
      });
    });

    // Xóa food log khỏi database
    await FoodLog.findByIdAndDelete(id);

    res.status(200).json({ message: "Food log deleted successfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting food log", error: error.message });
  }
};
