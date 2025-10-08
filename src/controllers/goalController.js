import goalModel from "../models/goalModel.js";

export const createGoal = async (req, res) => {
  const { type, title, target, unit, deadline } = req.body;

  const newGoal = await goalModel.create({
    userId: req.user._id,
    type,
    title,
    target,
    unit,
    deadline
  });

  res.status(201).json({
    status: "success",
    message: "Goal created successfully",
    data: { goal: newGoal }
  });
};

export const getGoals = async (req, res) => {
  const goals = await goalModel.find({ userId: req.user._id }).sort({ createdAt: -1 });
  
  res.status(200).json({
    status: "success",
    data: { goals }
  });
};

export const updateGoalProgress = async (req, res) => {
  const { id } = req.params;
  const { current } = req.body;

  const goal = await goalModel.findByIdAndUpdate(
    id,
    { current, status: current >= goal.target ? "completed" : "active" },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Goal updated successfully",
    data: { goal }
  });
};