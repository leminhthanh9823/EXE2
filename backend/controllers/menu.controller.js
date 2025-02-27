import Menu from "../models/Menu.js";
import Meal from "../models/Meal.js";

export const createMenu = async (req, res) => {
  try {
    const { userId, menuPackage, meals } = req.body;

    const days = meals.map((meal, index) => ({
      day: index + 1,
      meals: {
        breakfast: meal.breakfast,
        lunch: meal.lunch,
        dinner: meal.dinner,
      },
    }));

    const menu = new Menu({
      userId,
      menuPackage,
      days,
      price: menuPackage === "7-day" ? 400000 : 500000,
      isDefault: true,
    });
    await menu.save();

    res.status(201).json({ message: "Menu được tạo thành công", menu });
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi tạo menu" });
  }
};

// Sao chép menu để tùy chỉnh
export const customizeMenu = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { userId } = req.body;

    const menu = await Menu.findById(menuId);
    if (!menu) return res.status(404).json({ error: "Menu không tồn tại" });

    // Sao chép menu nhưng đổi userId
    const customMenu = new Menu({
      userId,
      menuPackage: menu.menuPackage,
      days: menu.days,
      price: menu.price,
      isDefault: false,
    });

    await customMenu.save();
    res.status(201).json(customMenu);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi sao chép menu" });
  }
};

// Lấy danh sách tất cả menu
export const getAllMenus = async (req, res) => {
  try {
    const { userId } = req.query;
    console.log("User ID nhận được:", userId);

    let query = {};
    if (userId && userId.trim() !== "") {
      query.userId = userId;
    }

    const menus = await Menu.find(query).populate(
      "days.meals.breakfast days.meals.lunch days.meals.dinner"
    );

    // Chuẩn hóa dữ liệu trước khi gửi về React
    const formattedMenus = menus.map((menu) => ({
      _id: menu._id,
      userId: menu.userId,
      name: `Thực đơn ${menu.menuPackage}`,
      details: `Gói: ${menu.menuPackage} - Giá: ${menu.price} VNĐ`,
      price: menu.price,
      menuPackage: menu.menuPackage,
      days: menu.days,
      createdAt: menu.createdAt,
    }));

    console.log("Menu đã tìm thấy:", formattedMenus);
    res.json(formattedMenus);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate(
      "days.meals.breakfast days.meals.lunch days.meals.dinner"
    );
    if (!menu) return res.status(404).json({ error: "Không tìm thấy menu" });

    res.json(menu);
  } catch (error) {
    res.status(500).json({ error: "Lỗi khi lấy chi tiết menu" });
  }
};
