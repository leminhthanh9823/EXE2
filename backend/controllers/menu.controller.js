import Menu from "../models/menu.js";
import Meal from "../models/Meal.js";
import User from "../models/user.model.js";

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

const getAdminUserIds = async () => {
  const adminUsers = await User.find({ isAdmin: true }, "_id");
  return adminUsers.map((user) => user._id);
};

export const getAllMenus = async (req, res) => {
  try {
    const { userId } = req.query;

    let query = {};
    if (userId && userId.trim() !== "") {
      query.userId = userId;
    }

    const menus = await Menu.find(query).populate(
      "days.meals.breakfast days.meals.lunch days.meals.dinner"
    );

    const adminUserIds = await getAdminUserIds();
    const normal_menus = await Menu.find({
      userId: { $in: adminUserIds },
    }).populate("days.meals.breakfast days.meals.lunch days.meals.dinner");

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

    const formattedNormalMenus = normal_menus.map((menu) => ({
      _id: menu._id,
      userId: menu.userId,
      name: `Thực đơn ${menu.menuPackage}`,
      details: `Gói: ${menu.menuPackage} - Giá: ${menu.price} VNĐ`,
      price: menu.price,
      menuPackage: menu.menuPackage,
      days: menu.days,
      createdAt: menu.createdAt,
    }));

    res.json({ myMenus: formattedMenus, menus: formattedNormalMenus });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error });
  }
};

// Lấy danh sách tất cả menu
export const getAllMenusAdmin = async (req, res) => {
  try {
    const { userId } = req.query;

    let query = {};
    if (userId && userId.trim() !== "") {
      query.userId = userId;
    }

    const menus = await Menu.find(query).populate(
      "days.meals.breakfast days.meals.lunch days.meals.dinner"
    );

    // Chuẩn hóa dữ liệu trước khi gửi về React
    const formattedMenus = await Promise.all(
      menus.map(async (menu) => {
        try {
          if (!menu.userId) throw new Error("User ID is missing"); // Kiểm tra null
          const user = await User.findById(menu.userId).select("email").exec(); // .exec() giúp xử lý tốt hơn

          return {
            _id: menu._id,
            userId: menu.userId,
            userEmail: user ? user.email : "Không tìm thấy user",
            name: `Thực đơn ${menu.menuPackage}`,
            details: `Gói: ${menu.menuPackage} - Giá: ${menu.price} VNĐ`,
            price: menu.price,
            menuPackage: menu.menuPackage,
            days: menu.days,
            createdAt: menu.createdAt,
          };
        } catch (error) {
          console.error("Lỗi khi lấy user:", error);
          return {
            _id: menu._id,
            userId: menu.userId,
            userEmail: null,
            name: `Thực đơn ${menu.menuPackage}`,
            details: `Gói: ${menu.menuPackage} - Giá: ${menu.price} VNĐ`,
            price: menu.price,
            menuPackage: menu.menuPackage,
            days: menu.days,
            createdAt: menu.createdAt,
            error: "Lỗi lấy user",
          };
        }
      })
    );

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
