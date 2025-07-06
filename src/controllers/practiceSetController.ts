import { Request, Response, RequestHandler } from "express";
import { PracticeSet } from "../models/PracticeSet";

// CREATE PracticeSet
export const createPracticeSet: RequestHandler = async (req, res) => {
  try {
    const { title, description, difficultyLevel } = req.body;
    // Access userId from JWT middleware
    const createdBy = (req as any).user?.userId;

    if (!title || !description || !difficultyLevel) {
      res.status(400).json({ message: "All fields are required." });
      return;
    }

    const newSet = await PracticeSet.create({ title, description, difficultyLevel, createdBy });
    res.status(201).json(newSet);
  } catch (error) {
    console.error("Error creating PracticeSet:", error);
    res.status(500).json({ message: "Could not create PracticeSet" });
  }
};

// GET ALL PracticeSets
export const getAllPracticeSets: RequestHandler = async (req, res) => {
  try {
    const sets = await PracticeSet.findAll();
    res.json(sets);
  } catch (error) {
    res.status(500).json({ message: "Error fetching PracticeSets" });
  }
};

// GET ONE PracticeSet
export const getPracticeSetById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const set = await PracticeSet.findByPk(id);
    if (!set) {
      res.status(404).json({ message: "PracticeSet not found" });
      return;
    }
    res.json(set);
  } catch (error) {
    res.status(500).json({ message: "Error fetching PracticeSet" });
  }
};

// UPDATE PracticeSet
export const updatePracticeSet: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, difficultyLevel } = req.body;

    const set = await PracticeSet.findByPk(id);
    if (!set) {
      res.status(404).json({ message: "PracticeSet not found" });
      return;
    }
    // (Optional) Ownership check using (req as any).user?.userId

    await set.update({ title, description, difficultyLevel });
    res.json(set);
  } catch (error) {
    res.status(500).json({ message: "Error updating PracticeSet" });
  }
};

// DELETE PracticeSet
export const deletePracticeSet: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const set = await PracticeSet.findByPk(id);
    if (!set) {
      res.status(404).json({ message: "PracticeSet not found" });
      return;
    }
    // (Optional) Ownership check using (req as any).user?.userId

    await set.destroy();
    res.json({ message: "PracticeSet deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting PracticeSet" });
  }
};
