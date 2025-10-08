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