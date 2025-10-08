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

  // First find the goal to get the target value
  const existingGoal = await goalModel.findOne({ _id: id, userId: req.user._id });
  
  if (!existingGoal) {
    return res.status(404).json({
      status: "error",
      message: "Goal not found"
    });
  }

  // Calculate status based on current vs target
  const status = current >= existingGoal.target ? "completed" : "active";

  // Update the goal with new progress and status
  const updatedGoal = await goalModel.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { current, status },
    { new: true }
  );

  console.log('Goal progress updated:', { id, current, target: existingGoal.target, status });

  res.status(200).json({
    status: "success",
    message: "Goal progress updated successfully",
    data: { goal: updatedGoal }
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