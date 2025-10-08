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

  const goal = await goalModel.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { current, status: current >= goal.target ? "completed" : "active" },
    { new: true }
  );

  if (!goal) {
    return res.status(404).json({
      status: "error",
      message: "Goal not found"
    });
  }

  res.status(200).json({
    status: "success",
    message: "Goal progress updated successfully",
    data: { goal }
  });
};

// Update goal details
export const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { type, title, target, unit, deadline } = req.body;

  const updatedGoal = await goalModel.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { type, title, target, unit, deadline },
    { new: true }
  );

  if (!updatedGoal) {
    return res.status(404).json({
      status: "error",
      message: "Goal not found"
    });
  }

  res.status(200).json({
    status: "success",
    message: "Goal updated successfully",
    data: { goal: updatedGoal }
  });
};

// Delete goal
export const deleteGoal = async (req, res) => {
  const { id } = req.params;

  const deletedGoal = await goalModel.findOneAndDelete({
    _id: id,
    userId: req.user._id
  });

  if (!deletedGoal) {
    return res.status(404).json({
      status: "error",
      message: "Goal not found"
    });
  }

  res.status(200).json({
    status: "success",
    message: "Goal deleted successfully"
  });
};