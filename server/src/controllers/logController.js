import DailyLog from '../models/DailyLog.js';
import User from '../models/User.js';
import FoodItem from '../models/FoodItem.js';

// Helper to recalculate daily totals whenever a meal is added or removed
const recalculateTotals = (log) => {
    let totals = { calories: 0, protein: 0, carbs: 0, fats: 0 };
    log.meals.forEach(meal => {
        totals.calories += meal.calories;
        totals.protein += meal.protein;
        totals.carbs += meal.carbs;
        totals.fats += meal.fats;
    });
    log.totalCalories = Math.round(totals.calories);
    log.totalProtein = Math.round(totals.protein);
    log.totalCarbs = Math.round(totals.carbs);
    log.totalFats = Math.round(totals.fats);
};

export const getDailyLog = async (req, res) => {
    try {
        const { date } = req.query; // YYYY-MM-DD
        if (!date) return res.status(400).json({ message: 'Date is required' });

        const user = await User.findOne({ firebaseUid: req.user.uid });
        let log = await DailyLog.findOne({ userId: user._id, logDate: date });
        
        // If no log exists for today, return an empty structure so the frontend doesn't crash
        if (!log) {
            log = { meals: [], totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFats: 0, logDate: date };
        }

        res.json({ status: 'success', data: log });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const logMeal = async (req, res) => {
    try {
        const { date, mealType, foodId, gramsConsumed } = req.body;
        
        const user = await User.findOne({ firebaseUid: req.user.uid });
        const food = await FoodItem.findById(foodId);
        
        if (!food) return res.status(404).json({ message: 'Food item not found' });

        // NUTRITIONAL SCALING EQUATION
        // actualNutrient = (baseNutrientPer100g * gramsConsumed) / 100
        const multiplier = gramsConsumed / 100;
        const newMeal = {
            mealType,
            foodId: food._id,
            foodName: food.name,
            gramsConsumed,
            calories: Math.round(food.baseCalories * multiplier),
            protein: Math.round(food.baseProtein * multiplier),
            carbs: Math.round(food.baseCarbs * multiplier),
            fats: Math.round(food.baseFats * multiplier)
        };

        // Find today's log or create a new one
        let log = await DailyLog.findOne({ userId: user._id, logDate: date });
        if (!log) {
            log = new DailyLog({ userId: user._id, logDate: date, meals: [] });
        }

        log.meals.push(newMeal);
        recalculateTotals(log);
        
        // Save the log
        await log.save();

        res.status(201).json({ status: 'success', data: log });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const deleteMeal = async (req, res) => {
    try {
        const { mealId } = req.params;
        const { date } = req.query;
        
        const user = await User.findOne({ firebaseUid: req.user.uid });
        let log = await DailyLog.findOne({ userId: user._id, logDate: date });
        
        if (!log) return res.status(404).json({ message: 'Log not found' });

        // Filter out the meal by its subdocument ID
        log.meals = log.meals.filter(meal => meal._id.toString() !== mealId);
        
        // Recalculate and save
        recalculateTotals(log);
        await log.save();

        res.json({ status: 'success', data: log });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
