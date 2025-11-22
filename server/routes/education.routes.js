import express from "express";
import { getAll, getById, create, update, remove, removeAll }
  from "../controllers/education.controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Public routes
router.get("/", getAll);
router.get("/:id", getById);

// Protected routes - require authentication
router.post("/", authCtrl.requireSignin, create);
router.put("/:id", authCtrl.requireSignin, update);
router.delete("/:id", authCtrl.requireSignin, remove);
router.delete("/", authCtrl.requireSignin, removeAll);

export default router;
