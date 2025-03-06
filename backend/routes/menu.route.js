import express from "express";
import {
  createMenu,
  customizeMenu,
  getAllMenus,
  getMenuById,
  getAllMenusAdmin,
  updateMenu,
} from "../controllers/menu.controller.js";

const router = express.Router();

router.post("/create", createMenu);
router.post("/:menuId/customize", customizeMenu);
router.get("/", getAllMenus);
router.get("/admins", getAllMenusAdmin);
router.get("/:id", getMenuById);
router.put("/:menuId", updateMenu);

export default router;
