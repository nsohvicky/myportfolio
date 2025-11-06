import express from "express";
import { getAll, getById, create, update, remove, removeAll }
  from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);
router.delete("/", removeAll);

export default router;
