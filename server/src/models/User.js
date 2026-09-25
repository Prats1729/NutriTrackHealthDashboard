// This file will define the MongoDB User Schema.
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: { type: String, required: true },
    name: { type: String, default: "" },
    age: { type: Number, default: 0, min: 0, max: 120 },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      default: "Other",
    },
    height_cm: { type: Number, default: 0, min: 0, max: 300 },
    weight_kg: { type: Number, default: 0, min: 0, max: 500 },
    activityLevel: { type: Number, default: 1.2, min: 1.0, max: 2.5 },
    goal: {
      type: String,
      enum: ["lose", "maintain", "gain"],
      default: "maintain",
    },
    targetCalories: { type: Number, default: 2000 },
    targetProtein: { type: Number, default: 100 },
    targetCarbs: { type: Number, default: 200 },
    targetFats: { type: Number, default: 65 },

    currentStreak: { type: Number, default: 0 },

    lastLoggedDate: { type: String, default: null },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  },
);


export default mongoose.model("User", UserSchema);