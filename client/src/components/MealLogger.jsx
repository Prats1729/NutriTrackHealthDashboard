import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../config/firebase.js';

export default function MealLogger({ user }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [log, setLog] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Meal Form State
  const [mealType, setMealType] = useState('breakfast');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [grams, setGrams] = useState(100);
  const [isLogging, setIsLogging] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = await auth.currentUser.getIdToken();
      
      // Fetch both the log for the selected date AND the user's latest targets
      const [logRes, profileRes] = await Promise.all([
        axios.get(`/api/logs/daily?date=${date}`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`/api/profile`, { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      setLog(logRes.data.data);
      setProfile(profileRes.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [date]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      const token = await auth.currentUser.getIdToken();
      const res = await axios.get(`/api/foods?q=${searchQuery}&limit=5`, { headers: { Authorization: `Bearer ${token}` } });
      setSearchResults(res.data.data);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const submitLog = async (e) => {
    e.preventDefault();
    if (!selectedFood || !grams) return;
    setIsLogging(true);
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.post('/api/logs/meal', {
        date,
        mealType,
        foodId: selectedFood._id,
        gramsConsumed: Number(grams)
      }, { headers: { Authorization: `Bearer ${token}` } });
      
      // Reset form and refresh log
      setSearchQuery('');
      setSearchResults([]);
      setSelectedFood(null);
      setGrams(100);
      fetchData();
    } catch (error) {
      console.error("Logging failed", error);
    } finally {
      setIsLogging(false);
    }
  };

  const deleteMeal = async (mealId) => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.delete(`/api/logs/meal/${mealId}?date=${date}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchData();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // Safe macro progress calculation
  const getProgress = (current, target) => {
    if (!target) return 0;
    return Math.min(100, Math.round((current / target) * 100));
  };

  if (loading && !log) return <div className="p-8 text-center text-slate-400">Loading Logger...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">edit_calendar</span>
          Daily Logger
        </h2>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)}
          className="h-10 px-3 bg-white border border-border-subtle rounded-md text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:border-primary"
        />
      </div>

      {/* Progress Dashboard */}
      {profile && log && (
        <div className="stitch-card p-6 bg-slate-900 text-white">
          <div className="flex justify-between items-end mb-6">
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Calories</div>
              <div className="text-3xl font-extrabold tabular-nums tracking-tight">
                {log.totalCalories} <span className="text-base font-semibold text-slate-500">/ {profile.targetCalories || 0} kcal</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Remaining</div>
              <div className="text-xl font-bold text-emerald tabular-nums">
                {Math.max(0, (profile.targetCalories || 0) - log.totalCalories)}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {/* Protein */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-border">Protein</span>
                <span>{log.totalProtein} / {profile.targetProtein || 0}g</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald transition-all duration-500" style={{ width: `${getProgress(log.totalProtein, profile.targetProtein)}%` }}></div>
              </div>
            </div>
            {/* Carbs */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-border">Carbs</span>
                <span>{log.totalCarbs} / {profile.targetCarbs || 0}g</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber transition-all duration-500" style={{ width: `${getProgress(log.totalCarbs, profile.targetCarbs)}%` }}></div>
              </div>
            </div>
            {/* Fats */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-crimson-border">Fats</span>
                <span>{log.totalFats} / {profile.targetFats || 0}g</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-crimson transition-all duration-500" style={{ width: `${getProgress(log.totalFats, profile.targetFats)}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Logger Form */}
        <div className="lg:col-span-1 space-y-6">
          <div className="stitch-card p-5 border-t-4 border-t-primary">
            <h3 className="font-bold text-slate-900 mb-4">Log a Meal</h3>
            
            <div className="mb-4">
              <label className="block text-xs font-semibold text-slate-600 mb-1">Meal Type</label>
              <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="w-full h-10 px-3 bg-slate-50 border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary">
                <option value="breakfast">Breakfast</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
                <option value="snack">Snack</option>
              </select>
            </div>

            {!selectedFood ? (
              <form onSubmit={handleSearch} className="mb-4 relative">
                <label className="block text-xs font-semibold text-slate-600 mb-1">Search Food</label>
                <div className="flex gap-2">
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="e.g. Chicken breast" className="flex-1 h-10 px-3 bg-slate-50 border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary" />
                  <button type="submit" className="h-10 px-3 bg-slate-100 text-slate-600 border border-border-subtle rounded-md hover:bg-slate-200">
                    <span className="material-symbols-outlined text-sm">search</span>
                  </button>
                </div>
                
                {searchResults.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-border-subtle rounded-md shadow-modal overflow-hidden">
                    {searchResults.map(f => (
                      <div key={f._id} onClick={() => setSelectedFood(f)} className="p-2 border-b border-border-subtle last:border-0 hover:bg-slate-50 cursor-pointer text-sm">
                        <div className="font-bold text-slate-800">{f.name}</div>
                        <div className="text-[10px] text-slate-500">{f.baseCalories}kcal per 100g</div>
                      </div>
                    ))}
                  </div>
                )}
              </form>
            ) : (
              <form onSubmit={submitLog} className="space-y-4">
                <div className="p-3 bg-primary-light border border-primary-border rounded-md relative">
                  <button type="button" onClick={() => setSelectedFood(null)} className="absolute top-2 right-2 text-primary hover:text-primary-active">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                  <div className="text-xs font-bold text-primary-dark uppercase">Selected Food</div>
                  <div className="font-bold text-slate-900 text-sm mt-1">{selectedFood.name}</div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Amount (grams)</label>
                  <input required type="number" min="1" value={grams} onChange={(e) => setGrams(e.target.value)} className="w-full h-10 px-3 bg-white border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary" />
                </div>
                
                <button type="submit" disabled={isLogging} className="w-full h-10 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-md shadow-sm transition-all disabled:opacity-50">
                  {isLogging ? 'Logging...' : 'Add to Diary'}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Log Entries */}
        <div className="lg:col-span-2">
          <div className="stitch-card p-6">
            <h3 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Today's Diary</h3>
            
            {log?.meals?.length === 0 ? (
              <div className="p-8 text-center text-slate-400 border-2 border-dashed border-border-subtle rounded-xl">
                You haven't logged any meals today.
              </div>
            ) : (
              <div className="space-y-3">
                {log?.meals?.map(meal => (
                  <div key={meal._id} className="flex items-center justify-between p-3 rounded-lg border border-border-subtle hover:border-slate-300 transition-colors bg-white">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <span className="material-symbols-outlined text-sm">restaurant</span>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{meal.foodName}</div>
                        <div className="text-[11px] text-slate-500 capitalize">{meal.mealType} &bull; {meal.gramsConsumed}g</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <div className="flex gap-2 text-[10px] font-bold">
                          <span className="text-emerald">{meal.protein}P</span>
                          <span className="text-amber">{meal.carbs}C</span>
                          <span className="text-crimson">{meal.fats}F</span>
                        </div>
                        <div className="text-sm font-bold text-slate-900">{meal.calories} kcal</div>
                      </div>
                      <button onClick={() => deleteMeal(meal._id)} className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-crimson hover:bg-crimson-light rounded transition-colors">
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
