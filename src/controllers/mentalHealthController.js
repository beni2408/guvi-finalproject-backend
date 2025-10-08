import mentalHealthModel from "../models/mentalHealthModel.js";

export const logMentalHealth = async (req, res) => {
  const { moodRating, stressLevel, sleepHours, notes, activities } = req.body;

  const newEntry = await mentalHealthModel.create({
    userId: req.user._id,
    moodRating,
    stressLevel,
    sleepHours,
    notes,
    activities
  });

  res.status(201).json({
    status: "success",
    message: "Mental health entry logged successfully",
    data: { entry: newEntry }
  });
};

export const getMentalHealthHistory = async (req, res) => {
  const entries = await mentalHealthModel.find({ userId: req.user._id }).sort({ date: -1 });
  
  res.status(200).json({
    status: "success",
    data: { entries }
  });
};

export const getMentalHealthStats = async (req, res) => {
  const entries = await mentalHealthModel.find({ userId: req.user._id });
  
  const avgMood = entries.reduce((sum, entry) => sum + entry.moodRating, 0) / entries.length;
  const avgStress = entries.reduce((sum, entry) => sum + entry.stressLevel, 0) / entries.length;
  const avgSleep = entries.reduce((sum, entry) => sum + entry.sleepHours, 0) / entries.length;

  res.status(200).json({
    status: "success",
    data: {
      averageMood: avgMood || 0,
      averageStress: avgStress || 0,
      averageSleep: avgSleep || 0,
      totalEntries: entries.length
    }
  });
};

// Update mental health entry
export const updateMentalHealth = async (req, res) => {
  const { id } = req.params;
  const { moodRating, stressLevel, sleepHours, notes, activities } = req.body;

  const updatedEntry = await mentalHealthModel.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { moodRating, stressLevel, sleepHours, notes, activities },
    { new: true }
  );

  if (!updatedEntry) {
    return res.status(404).json({
      status: "error",
      message: "Mental health entry not found"
    });
  }

  res.status(200).json({
    status: "success",
    message: "Mental health entry updated successfully",
    data: { entry: updatedEntry }
  });
};

// Delete mental health entry
export const deleteMentalHealth = async (req, res) => {
  const { id } = req.params;

  const deletedEntry = await mentalHealthModel.findOneAndDelete({
    _id: id,
    userId: req.user._id
  });

  if (!deletedEntry) {
    return res.status(404).json({
      status: "error",
      message: "Mental health entry not found"
    });
  }

  res.status(200).json({
    status: "success",
    message: "Mental health entry deleted successfully"
  });
};