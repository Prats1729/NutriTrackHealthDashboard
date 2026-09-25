import mongoose from 'mongoose';

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  baseCalories: { type: Number, required: true }, // per 100g
  baseProtein: { type: Number, required: true },  // per 100g
  baseCarbs: { type: Number, required: true },    // per 100g
  baseFats: { type: Number, required: true },     // per 100g
  isPreset: { type: Boolean, default: true },     // Global food vs User-created food
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

export default mongoose.model('FoodItem', foodItemSchema);
