import mongoose from 'mongoose';

const dailyLogSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  logDate: { type: String, required: true, index: true }, // Format: "YYYY-MM-DD"
  meals: [{
    mealType: { type: String, enum: ["breakfast", "lunch", "dinner", "snack"], required: true },
    foodId: { type: mongoose.Schema.Types.ObjectId, ref: "FoodItem" },
    foodName: { type: String, required: true },
    gramsConsumed: { type: Number, required: true },
    calories: { type: Number, required: true },
    protein: { type: Number, required: true },
    carbs: { type: Number, required: true },
    fats: { type: Number, required: true }
  }],
  totalCalories: { type: Number, default: 0 },
  totalProtein: { type: Number, default: 0 },
  totalCarbs: { type: Number, default: 0 },
  totalFats: { type: Number, default: 0 }
}, { timestamps: true });

// Ensure a user only has one active log document per day
dailyLogSchema.index({ userId: 1, logDate: 1 }, { unique: true });

export default mongoose.model('DailyLog', dailyLogSchema);
