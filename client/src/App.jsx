import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from './config/firebase.js';
import { useAuth } from './context/AuthContext.jsx'; 
import Login from './components/Login.jsx'; 
import Profile from './components/Profile.jsx';
import FoodCatalog from './components/FoodCatalog.jsx';
import MealLogger from './components/MealLogger.jsx';
import Analytics from './components/Analytics.jsx';

export default function App() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('logger');
  const [streak, setStreak] = useState(0);
  
  // Fetch live streak on mount and whenever tab changes
  useEffect(() => {
    if (user && auth.currentUser) {
      auth.currentUser.getIdToken().then(token => {
        axios.get('/api/profile', { headers: { Authorization: `Bearer ${token}` } })
          .then(res => setStreak(res.data.data.currentStreak || 0))
          .catch(err => console.error(err));
      });
    }
  }, [user, activeTab]);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-canvas text-slate-900 flex antialiased">
      {/* Persistent Sidebar */}
      <aside className="w-64 bg-card border-r border-border-subtle flex flex-col hidden md:flex sticky top-0 h-screen">
        <div className="h-16 flex items-center px-6 border-b border-border-subtle">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shadow-card">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900">NutriTrack</span>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-border-subtle bg-slate-50">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Streak</span>
            <div className="flex items-center gap-1">
              <span className={`material-symbols-outlined text-base ${streak > 0 ? 'text-amber' : 'text-slate-300'}`}>local_fire_department</span>
              <span className={`font-bold tabular-nums ${streak > 0 ? 'text-slate-900' : 'text-slate-400'}`}>{streak} Days</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <button 
            onClick={() => setActiveTab('logger')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'logger' ? 'bg-primary-light text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[20px]">edit_calendar</span>
            Daily Logger
          </button>

          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'analytics' ? 'bg-primary-light text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[20px]">insights</span>
            Analytics
          </button>

          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'profile' ? 'bg-primary-light text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[20px]">person</span>
            Health Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${activeTab === 'catalog' ? 'bg-primary-light text-primary' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
          >
            <span className="material-symbols-outlined text-[20px]">restaurant_menu</span>
            Food Catalog
          </button>
        </nav>

        <div className="p-4 border-t border-border-subtle">
          <div className="text-xs font-medium text-slate-600 truncate px-2 mb-3">
            {user.name || user.email}
          </div>
          <button onClick={logout} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-md border border-border-subtle transition-colors">
            <span className="material-symbols-outlined text-sm">logout</span>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-card border-b border-border-subtle sticky top-0 z-40 md:hidden">
          <div className="h-16 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-900">NutriTrack</span>
              {streak > 0 && (
                <div className="flex items-center bg-amber-light px-2 py-0.5 rounded-full border border-amber-border">
                  <span className="material-symbols-outlined text-amber text-sm">local_fire_department</span>
                  <span className="text-xs font-bold text-amber-dark ml-1">{streak}</span>
                </div>
              )}
            </div>
            <button onClick={logout} className="text-sm font-medium text-slate-600">Log Out</button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 w-full max-w-7xl mx-auto flex-1">
          <div className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-light text-emerald-dark border border-emerald-border mb-2 inline-block">
              Stage 7 Active
            </span>
          </div>

          {activeTab === 'logger' && <MealLogger user={user} />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'profile' && <Profile user={user} />}
          {activeTab === 'catalog' && <FoodCatalog />}
        </main>
      </div>
    </div>
  );
}
