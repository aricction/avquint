import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    toggleStatus
} from "../controllers/taskController.js";

const router = express.Router();
router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.patch("/:id/toggle", toggleStatus);

export default router;