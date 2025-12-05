import express from "express";
import ContactCtrl from "../controllers/Contact.Controller.js";
import authCtrl from "../controllers/auth.controller.js";

const router = express.Router();

// Public routes
router.get("/", ContactCtrl.getAll);
router.get("/:id", ContactCtrl.getById);

// Protected routes - require authentication
router.post("/", authCtrl.requireSignin, ContactCtrl.create);
router.put("/:id", authCtrl.requireSignin, ContactCtrl.update);
router.delete("/:id", authCtrl.requireSignin, ContactCtrl.remove);
router.delete("/", authCtrl.requireSignin, ContactCtrl.removeAll);

export default router;
