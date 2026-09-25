import User from '../models/User.js';

// Calculate targets based on the Mifflin-St Jeor equation
const calculateTargets = (profile) => {
    let bmr;
    if (profile.gender === 'male') {
        bmr = 10 * profile.weight_kg + 6.25 * profile.height_cm - 5 * profile.age + 5;
    } else {
        bmr = 10 * profile.weight_kg + 6.25 * profile.height_cm - 5 * profile.age - 161;
    }

    const tdee = bmr * profile.activityLevel;
    let targetCalories = tdee;

    // Adjust for goals
    if (profile.goal === 'lose') targetCalories -= 500;
    if (profile.goal === 'gain') targetCalories += 300;

    // Macros: 2.0g protein/kg, 25% fats, rest carbs
    const targetProtein = 2.0 * profile.weight_kg;
    const targetFats = (targetCalories * 0.25) / 9;
    const targetCarbs = (targetCalories - (targetProtein * 4) - (targetFats * 9)) / 4;

    return {
        targetCalories: Math.round(targetCalories),
        targetProtein: Math.round(targetProtein),
        targetFats: Math.round(targetFats),
        targetCarbs: Math.round(targetCarbs)
    };
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.uid });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ status: 'success', data: user });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const { age, gender, height_cm, weight_kg, activityLevel, goal, name } = req.body;
        
        // Ensure all required fields exist for calculation
        if (!age || !gender || !height_cm || !weight_kg || !activityLevel || !goal) {
            return res.status(400).json({ status: 'error', message: 'All biological fields are required' });
        }

        // Calculate new targets based on updated metrics
        const targets = calculateTargets({ age, gender, height_cm, weight_kg, activityLevel, goal });

        const updatedUser = await User.findOneAndUpdate(
            { firebaseUid: req.user.uid },
            { 
                name, age, gender, height_cm, weight_kg, activityLevel, goal,
                ...targets // Merge in the freshly calculated macros
            },
            { new: true, runValidators: true }
        );

        res.json({ status: 'success', data: updatedUser });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
