import FoodItem from '../models/FoodItem.js';
import User from '../models/User.js';

export const searchFoods = async (req, res) => {
    try {
        const { q = '', limit = 10 } = req.query;
        const user = await User.findOne({ firebaseUid: req.user.uid });
        
        // Search for foods matching the query text.
        // It returns global preset foods OR custom foods created by this specific user.
        const query = {
            name: { $regex: q, $options: 'i' }, // Case-insensitive text search
            $or: [
                { isPreset: true },
                { createdBy: user._id }
            ]
        };

        const foods = await FoodItem.find(query)
            .limit(parseInt(limit))
            .sort({ name: 1 });
            
        res.json({ status: 'success', data: foods });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const createFood = async (req, res) => {
    try {
        const { name, baseCalories, baseProtein, baseCarbs, baseFats } = req.body;
        const user = await User.findOne({ firebaseUid: req.user.uid });

        const newFood = await FoodItem.create({
            name,
            baseCalories,
            baseProtein,
            baseCarbs,
            baseFats,
            isPreset: false, // User-created foods are strictly private
            createdBy: user._id
        });

        res.status(201).json({ status: 'success', data: newFood });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
