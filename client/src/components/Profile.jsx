import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../config/firebase.js';

export default function Profile({ user }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    age: 0,
    gender: 'male',
    height_cm: 0,
    weight_kg: 0,
    activityLevel: 1.2,
    goal: 'maintain',
  });

  const fetchProfile = async () => {
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.get('/api/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data.data);
      setFormData({
        name: response.data.data.name || '',
        age: response.data.data.age || 0,
        gender: response.data.data.gender || 'male',
        height_cm: response.data.data.height_cm || 0,
        weight_kg: response.data.data.weight_kg || 0,
        activityLevel: response.data.data.activityLevel || 1.2,
        goal: response.data.data.goal || 'maintain',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.put('/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-400">Loading Profile...</div>;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Edit Form */}
      <div className="lg:col-span-2 stitch-card p-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-primary text-2xl">person</span>
          <h2 className="text-lg font-bold text-slate-900">Health & Biological Profile</h2>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-crimson-light border border-crimson-border text-crimson-dark text-sm rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full h-10 px-3 bg-slate-50 border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Age</label>
              <input type="number" name="age" value={formData.age || ''} onChange={handleChange} className="w-full h-10 px-3 bg-slate-50 border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full h-10 px-3 bg-slate-50 border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Goal</label>
              <select name="goal" value={formData.goal} onChange={handleChange} className="w-full h-10 px-3 bg-slate-50 border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
                <option value="lose">Weight Loss (-500 kcal)</option>
                <option value="maintain">Maintenance</option>
                <option value="gain">Muscle Gain (+300 kcal)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Height (cm)</label>
              <input type="number" name="height_cm" value={formData.height_cm || ''} onChange={handleChange} className="w-full h-10 px-3 bg-slate-50 border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Weight (kg)</label>
              <input type="number" name="weight_kg" value={formData.weight_kg || ''} onChange={handleChange} step="0.1" className="w-full h-10 px-3 bg-slate-50 border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1.5">Activity Level (TDEE Multiplier)</label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full h-10 px-3 bg-slate-50 border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all">
              <option value="1.2">Sedentary (Little or no exercise)</option>
              <option value="1.375">Lightly Active (Light exercise 1-3 days/week)</option>
              <option value="1.55">Moderately Active (Moderate exercise 3-5 days/week)</option>
              <option value="1.725">Very Active (Hard exercise 6-7 days/week)</option>
              <option value="1.9">Extra Active (Very hard exercise & physical job)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-border-subtle flex justify-end">
            <button type="submit" disabled={saving} className="h-10 px-6 bg-primary hover:bg-primary-hover active:bg-primary-active text-white text-sm font-semibold rounded-md shadow-sm transition-all disabled:opacity-50">
              {saving ? 'Calculating...' : 'Save & Calculate Metrics'}
            </button>
          </div>
        </form>
      </div>

      {/* Results / Macros Display */}
      <div className="stitch-card p-6 bg-slate-50">
        <div className="flex items-center gap-2 mb-6">
          <span className="material-symbols-outlined text-emerald text-2xl">local_fire_department</span>
          <h2 className="text-lg font-bold text-slate-900">Your Targets</h2>
        </div>

        {profile?.targetCalories ? (
          <div className="space-y-6">
            <div className="text-center p-6 bg-white rounded-xl border border-border-subtle shadow-sm">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Daily Calories</div>
              <div className="text-4xl font-extrabold text-slate-900 tabular-nums tracking-tight">
                {profile.targetCalories} <span className="text-base font-semibold text-slate-400">kcal</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-emerald"></div>
                  <span className="text-sm font-semibold text-slate-700">Protein</span>
                </div>
                <span className="text-sm font-bold text-slate-900 tabular-nums">{profile.targetProtein}g</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber"></div>
                  <span className="text-sm font-semibold text-slate-700">Carbs</span>
                </div>
                <span className="text-sm font-bold text-slate-900 tabular-nums">{profile.targetCarbs}g</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-border-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-crimson"></div>
                  <span className="text-sm font-semibold text-slate-700">Fats</span>
                </div>
                <span className="text-sm font-bold text-slate-900 tabular-nums">{profile.targetFats}g</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 text-center leading-relaxed">
              Targets calculated automatically using the Mifflin-St Jeor equation based on your biological data and goals.
            </div>
          </div>
        ) : (
          <div className="h-40 flex flex-col items-center justify-center text-center">
            <span className="material-symbols-outlined text-slate-300 text-4xl mb-2">calculate</span>
            <p className="text-sm text-slate-500">Fill out your biological profile and save to generate your targets.</p>
          </div>
        )}
      </div>
    </div>
  );
}
