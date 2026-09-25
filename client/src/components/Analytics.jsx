import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../config/firebase.js';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';

export default function Analytics() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = await auth.currentUser.getIdToken();
        const response = await axios.get('/api/analytics/7day', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Recharts renders data chronologically, so we reverse it (since backend returned newest to oldest)
        setData(response.data.data.reverse());
      } catch (error) {
        console.error("Failed to load analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-400">Loading Analytics...</div>;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-border-subtle p-3 rounded-lg shadow-modal">
          <p className="font-bold text-slate-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-sm font-semibold">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="text-slate-600 capitalize">{entry.name}:</span>
              <span className="text-slate-900">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <div className="stitch-card p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">insights</span>
            7-Day Analytics & Trends
          </h2>
          <p className="text-sm text-slate-500 mt-1">Monitor your caloric adherence and macronutrient splits over the past week.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Caloric Adherence Chart */}
        <div className="stitch-card p-6">
          <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Caloric Adherence vs Target</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine y={data[0]?.targetCalories} stroke="#059669" strokeDasharray="3 3" label={{ position: 'top', value: 'Target', fill: '#059669', fontSize: 10, fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="calories" name="Calories" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorCalories)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Macronutrient Distribution Chart */}
        <div className="stitch-card p-6">
          <h3 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Macronutrient Distribution (Grams)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
                <Tooltip content={<CustomTooltip />} cursor={{fill: '#F8FAFC'}} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} />
                <Bar dataKey="protein" name="Protein" stackId="a" fill="#059669" radius={[0, 0, 4, 4]} />
                <Bar dataKey="carbs" name="Carbs" stackId="a" fill="#D97706" />
                <Bar dataKey="fats" name="Fats" stackId="a" fill="#DC2626" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
