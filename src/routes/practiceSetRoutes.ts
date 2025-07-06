import { Router } from "express";
import {
  createPracticeSet,
  getAllPracticeSets,
  getPracticeSetById,
  updatePracticeSet,
  deletePracticeSet,
} from "../controllers/practiceSetController";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", authenticateToken, createPracticeSet);   // Create
router.get("/", getAllPracticeSets);                      // List all (public)
router.get("/:id", getPracticeSetById);                   // Get by ID (public)
router.put("/:id", authenticateToken, updatePracticeSet); // Update
router.delete("/:id", authenticateToken, deletePracticeSet); // Delete

export default router;
