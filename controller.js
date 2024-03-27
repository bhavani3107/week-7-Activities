const Goal = require("./model");

// get all Goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add one Goal
const addGoal = async (req, res) => {
  try {
    const { title, description, targetDate, achieved } = req.body;
    const newGoal = new Goal({ title, description, targetDate, achieved });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Goal by ID
const getGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findById(id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Goal by ID
const deleteGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const goal = await Goal.findByIdAndDelete({ _id: id });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete all Goals
const deleteAllGoals = async (req, res) => {
  try {
    const result = await Goal.deleteMany({});
    res
      .status(200)
      .json({ message: `Deleted ${result.deletedCount} books successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Goal by ID
const updateGoal = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedGoal = req.body;
    const goal = await Goal.findOneAndUpdate({ _id: id }, updatedGoal);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGoals,
  addGoal,
  getGoal,
  deleteGoal,
  deleteAllGoals,
  updateGoal,
};