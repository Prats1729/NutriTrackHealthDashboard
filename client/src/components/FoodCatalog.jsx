import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../config/firebase.js';

export default function FoodCatalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Custom Food Form State
  const [isAdding, setIsAdding] = useState(false);
  const [customFood, setCustomFood] = useState({
    name: '',
    baseCalories: '',
    baseProtein: '',
    baseCarbs: '',
    baseFats: ''
  });

  const searchCatalog = async (query = '') => {
    setLoading(true);
    setError(null);
    try {
      const token = await auth.currentUser.getIdToken();
      const response = await axios.get(`/api/foods?q=${query}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFoods(response.data.data);
    } catch (err) {
      setError('Failed to fetch food catalog');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    searchCatalog();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchCatalog(searchQuery);
  };

  const handleCustomFoodChange = (e) => {
    const { name, value } = e.target;
    setCustomFood(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateFood = async (e) => {
    e.preventDefault();
    try {
      const token = await auth.currentUser.getIdToken();
      
      // Convert to numbers
      const payload = {
        name: customFood.name,
        baseCalories: Number(customFood.baseCalories),
        baseProtein: Number(customFood.baseProtein),
        baseCarbs: Number(customFood.baseCarbs),
        baseFats: Number(customFood.baseFats),
      };

      await axios.post('/api/foods', payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setIsAdding(false);
      setCustomFood({ name: '', baseCalories: '', baseProtein: '', baseCarbs: '', baseFats: '' });
      searchCatalog(searchQuery); // Refresh the list
    } catch (err) {
      setError('Failed to create custom food');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Search */}
      <div className="stitch-card p-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white border border-border-subtle shadow-sm rounded-xl">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">restaurant_menu</span>
            Food Catalog
          </h2>
          <p className="text-sm text-slate-500 mt-1">Search the global database or create custom foods.</p>
        </div>
        
        <form onSubmit={handleSearchSubmit} className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search for an ingredient..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-border-subtle rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
          <button type="submit" className="hidden"></button>
        </form>
      </div>

      {error && (
        <div className="p-3 bg-crimson-light border border-crimson-border text-crimson-dark text-sm rounded-md">
          {error}
        </div>
      )}

      {/* Main Grid: Catalog List & Custom Food Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Results List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Search Results</h3>
            <span className="text-xs font-medium text-slate-400">{foods.length} items found</span>
          </div>

          {loading ? (
            <div className="text-center p-8 text-slate-400">Searching...</div>
          ) : foods.length === 0 ? (
            <div className="stitch-card p-10 flex flex-col items-center justify-center text-center border-dashed border-2">
              <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">search_off</span>
              <p className="text-slate-600 font-medium">No foods found</p>
              <p className="text-sm text-slate-400 mt-1">Try a different search or create a custom food.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {foods.map(food => (
                <div key={food._id} className="stitch-card p-4 flex items-center justify-between hover:border-primary-border transition-colors">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900">{food.name}</h4>
                      {!food.isPreset && (
                        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-light text-amber-dark border border-amber-border rounded-full">Custom</span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Base metrics per 100g</div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Kcal</div>
                      <div className="text-sm font-bold text-slate-900">{food.baseCalories}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-emerald uppercase">Pro</div>
                      <div className="text-sm font-bold text-slate-900">{food.baseProtein}g</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-amber uppercase">Carb</div>
                      <div className="text-sm font-bold text-slate-900">{food.baseCarbs}g</div>
                    </div>
                    <div className="text-center">
                      <div className="text-[10px] font-bold text-crimson uppercase">Fat</div>
                      <div className="text-sm font-bold text-slate-900">{food.baseFats}g</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Custom Food Creation Panel */}
        <div>
          {!isAdding ? (
            <button 
              onClick={() => setIsAdding(true)}
              className="w-full h-12 flex items-center justify-center gap-2 bg-slate-50 border-2 border-dashed border-border-subtle hover:border-primary hover:text-primary hover:bg-primary-light rounded-xl transition-all text-sm font-bold text-slate-500"
            >
              <span className="material-symbols-outlined">add</span>
              Create Custom Food
            </button>
          ) : (
            <div className="stitch-card p-5 border-2 border-primary-border bg-primary-light/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-primary-dark">New Custom Food</h3>
                <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-700">
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              <form onSubmit={handleCreateFood} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">Food Name</label>
                  <input required type="text" name="name" value={customFood.name} onChange={handleCustomFoodChange} className="w-full h-9 px-3 bg-white border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary" />
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">Calories / 100g</label>
                    <input required type="number" step="0.1" name="baseCalories" value={customFood.baseCalories} onChange={handleCustomFoodChange} className="w-full h-9 px-3 bg-white border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-emerald mb-1">Protein (g)</label>
                    <input required type="number" step="0.1" name="baseProtein" value={customFood.baseProtein} onChange={handleCustomFoodChange} className="w-full h-9 px-3 bg-white border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-amber mb-1">Carbs (g)</label>
                    <input required type="number" step="0.1" name="baseCarbs" value={customFood.baseCarbs} onChange={handleCustomFoodChange} className="w-full h-9 px-3 bg-white border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-crimson mb-1">Fats (g)</label>
                    <input required type="number" step="0.1" name="baseFats" value={customFood.baseFats} onChange={handleCustomFoodChange} className="w-full h-9 px-3 bg-white border border-border-subtle rounded-md text-sm focus:outline-none focus:border-primary" />
                  </div>
                </div>

                <button type="submit" className="w-full h-9 mt-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-md shadow-sm transition-all">
                  Save to My Catalog
                </button>
              </form>
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}
