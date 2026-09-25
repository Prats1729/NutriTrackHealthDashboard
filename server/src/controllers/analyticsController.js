import DailyLog from '../models/DailyLog.js';
import User from '../models/User.js';

export const get7DayAnalytics = async (req, res) => {
    try {
        const user = await User.findOne({ firebaseUid: req.user.uid });
        
        // Generate an array of the last 7 calendar dates (YYYY-MM-DD)
        const dates = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            dates.push(d.toISOString().split('T')[0]);
        }

        // Fetch all logs that match the user and fall within those 7 dates
        const logs = await DailyLog.find({
            userId: user._id,
            logDate: { $in: dates }
        });

        // Construct a continuous 7-day array. 
        // If the user skipped a day, we mathematically insert 0s so Recharts doesn't break the timeline.
        const analyticsData = dates.map(date => {
            const log = logs.find(l => l.logDate === date);
            
            // Convert 'YYYY-MM-DD' to 'Mon', 'Tue' etc for nicer charts
            const dateObj = new Date(date);
            const shortDay = dateObj.toLocaleDateString('en-US', { weekday: 'short' });

            return {
                date,
                day: shortDay,
                calories: log ? log.totalCalories : 0,
                protein: log ? log.totalProtein : 0,
                carbs: log ? log.totalCarbs : 0,
                fats: log ? log.totalFats : 0,
                targetCalories: user.targetCalories || 0 // Included for charting reference lines
            };
        });

        res.json({ status: 'success', data: analyticsData });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};
