import nutritionModel from "../models/nutritionModel.js";

export const logFood = async (req, res) => {
  const { foodName, calories, protein, carbs, fat, quantity, mealType } = req.body;

  const newFood = await nutritionModel.create({
    userId: req.user._id,
    foodName,
    calories,
    protein,
    carbs,
    fat,
    quantity,
    mealType
  });

  res.status(201).json({
    status: "success",
    message: "Food logged successfully",
    data: { food: newFood }
  });
};

export const getNutritionHistory = async (req, res) => {
  const foods = await nutritionModel.find({ userId: req.user._id }).sort({ date: -1 });
  
  res.status(200).json({
    status: "success",
    data: { foods }
  });
};

export const getNutritionStats = async (req, res) => {
  const foods = await nutritionModel.find({ userId: req.user._id });
  
  const totalCalories = foods.reduce((sum, food) => sum + food.calories, 0);
  const totalProtein = foods.reduce((sum, food) => sum + food.protein, 0);
  const totalCarbs = foods.reduce((sum, food) => sum + food.carbs, 0);
  const totalFat = foods.reduce((sum, food) => sum + food.fat, 0);

  res.status(200).json({
    status: "success",
    data: {
      totalCalories,
      totalProtein,
      totalCarbs,
      totalFat,
      totalMeals: foods.length
    }
  });
};

// Update food entry
export const updateFood = async (req, res) => {
  const { id } = req.params;
  const { foodName, calories, protein, carbs, fat, quantity, mealType } = req.body;

  const updatedFood = await nutritionModel.findOneAndUpdate(
    { _id: id, userId: req.user._id },
    { foodName, calories, protein, carbs, fat, quantity, mealType },
    { new: true }
  );

  if (!updatedFood) {
    return res.status(404).json({
      status: "error",
      message: "Food entry not found"
    });
  }

  res.status(200).json({
    status: "success",
    message: "Food entry updated successfully",
    data: { food: updatedFood }
  });
};

// Delete food entry
export const deleteFood = async (req, res) => {
  const { id } = req.params;

  const deletedFood = await nutritionModel.findOneAndDelete({
    _id: id,
    userId: req.user._id
  });

  if (!deletedFood) {
    return res.status(404).json({
      status: "error",
      message: "Food entry not found"
    });
  }

  res.status(200).json({
    status: "success",
    message: "Food entry deleted successfully"
  });
};