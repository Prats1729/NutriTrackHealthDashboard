import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastPingTime, setLastPingTime] = useState(null);

  const fetchHealthStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/api/health');
      setHealthData(response.data);
      setLastPingTime(new Date().toLocaleTimeString());
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to connect to backend');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthStatus();
  }, []);

  return (
    <div className="min-h-screen bg-canvas text-slate-900 flex flex-col antialiased">
      {/* Top Application Bar */}
      <header className="bg-card border-b border-border-subtle sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white shadow-card">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                eco
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-900 leading-none">NutriTrack</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-primary-light text-primary border border-primary-border">
                  Stage 1 Active
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">Health Analytics &amp; Nutrition Planner</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchHealthStatus}
              disabled={loading}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-card border border-border-subtle hover:border-border-hover bg-card hover:bg-slate-50 text-xs font-semibold text-slate-900 transition shadow-card disabled:opacity-50"
            >
              <span className={`material-symbols-outlined text-sm ${loading ? 'animate-spin' : ''}`}>
                refresh
              </span>
              <span>{loading ? 'Pinging API...' : 'Ping Backend API'}</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <span>Client:</span>
              <span className="text-emerald font-semibold">Vite:5173</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Stage 1 Header Banner */}
        <div className="stitch-card p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald"></span>
                <span className="text-xs font-semibold tracking-wider text-emerald uppercase">Stage 1 Milestone Achieved</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Full-Stack Environment &amp; MERN Scaffold Ready
              </h1>
              <p className="text-sm text-slate-600 mt-1 max-w-2xl">
                Express API server with security middlewares, MongoDB Atlas Mongoose adapter, and Vite + React client matching the Nutritional Intelligence design system.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-400">Last verified:</span>
              <span className="text-xs font-mono font-semibold text-slate-900 bg-slate-100 px-2 py-1 rounded">
                {lastPingTime || 'Initializing...'}
              </span>
            </div>
          </div>
        </div>

        {/* Diagnostics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Server Diagnostic Card */}
          <div className="stitch-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Express Server</span>
              <span className="material-symbols-outlined text-primary text-xl">dns</span>
            </div>
            {loading && !healthData ? (
              <div className="animate-pulse space-y-2">
                <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              </div>
            ) : error ? (
              <div>
                <div className="flex items-center gap-1.5 text-crimson font-bold text-lg">
                  <span className="material-symbols-outlined text-base">error</span>
                  <span>Unreachable</span>
                </div>
                <p className="text-xs text-crimson-dark mt-1 font-mono">{error}</p>
                <p className="text-xs text-slate-400 mt-2">Ensure `npm run dev` is running in `server/` on port 5000.</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-slate-900 tabular-nums">Port {healthData?.server?.port || 5000}</span>
                  <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-light text-emerald border border-emerald-border rounded-full">
                    {healthData?.server?.status || 'Online'}
                  </span>
                </div>
                <div className="mt-3 pt-3 border-t border-border-subtle flex flex-col gap-1 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Uptime:</span>
                    <span className="font-mono text-slate-900 font-medium">{healthData?.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Environment:</span>
                    <span className="font-mono text-slate-900 font-medium">{healthData?.environment}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Database Diagnostic Card */}
          <div className="stitch-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Database Connection</span>
              <span className="material-symbols-outlined text-emerald text-xl">database</span>
            </div>
            {loading && !healthData ? (
              <div className="animate-pulse space-y-2">
                <div className="h-6 bg-slate-200 rounded w-1/2"></div>
                <div className="h-4 bg-slate-100 rounded w-3/4"></div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-slate-900 capitalize">
                    {healthData?.database?.status || 'Disconnected'}
                  </span>
                  {healthData?.database?.status === 'connected' ? (
                    <span className="px-2 py-0.5 text-[11px] font-semibold bg-emerald-light text-emerald border border-emerald-border rounded-full">
                      Mongoose Ready
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 text-[11px] font-semibold bg-amber-light text-amber border border-amber-border rounded-full">
                      Awaiting Atlas URI
                    </span>
                  )}
                </div>
                <div className="mt-3 pt-3 border-t border-border-subtle flex flex-col gap-1 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Connection State:</span>
                    <span className="font-mono text-slate-900 font-medium">
                      Code {healthData?.database?.stateCode ?? 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Host:</span>
                    <span className="font-mono text-slate-900 font-medium truncate max-w-[150px]">
                      {healthData?.database?.host || 'Configure in .env'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Design System Verification Card */}
          <div className="stitch-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Design System Tokens</span>
              <span className="material-symbols-outlined text-primary text-xl">palette</span>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 mb-2">Nutritional Intelligence</div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded bg-primary" title="Primary: #4F46E5"></div>
                <div className="w-6 h-6 rounded bg-emerald" title="Target/Goal: #059669"></div>
                <div className="w-6 h-6 rounded bg-amber" title="Warning: #D97706"></div>
                <div className="w-6 h-6 rounded bg-crimson" title="Critical: #DC2626"></div>
                <div className="w-6 h-6 rounded bg-card border border-border-subtle" title="Card: #FFFFFF"></div>
                <div className="w-6 h-6 rounded bg-slate-100" title="Panel: #F1F5F9"></div>
              </div>
              <div className="pt-2 border-t border-border-subtle flex items-center justify-between text-xs">
                <span className="text-slate-400">Typography:</span>
                <span className="font-sans font-semibold text-slate-900">Geist Grotesque</span>
              </div>
            </div>
          </div>
        </div>

        {/* Roadmap Progress Section */}
        <div className="stitch-card p-6">
          <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">timeline</span>
            <span>Production Roadmap Execution Status</span>
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-card bg-emerald-light border border-emerald-border">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-emerald text-xl">check_circle</span>
                <div>
                  <div className="text-xs font-bold text-slate-900">STAGE 1: Scaffold, Environment Setup &amp; DB Connection</div>
                  <div className="text-xs text-emerald-dark">Express + Mongoose + Vite/React + Tailwind complete and verified.</div>
                </div>
              </div>
              <span className="text-[11px] font-bold text-emerald uppercase tracking-wider bg-white px-2 py-0.5 rounded border border-emerald-border">
                Ready for Review
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-card bg-slate-50 border border-border-subtle opacity-70">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-400 text-xl">radio_button_unchecked</span>
                <div>
                  <div className="text-xs font-bold text-slate-700">STAGE 2: Firebase Authentication &amp; User Synchronization</div>
                  <div className="text-xs text-slate-500">Google OAuth &amp; Email/Password, Firebase Admin JWT verification, MongoDB User sync.</div>
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Upcoming</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-card bg-slate-50 border border-border-subtle opacity-50">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-slate-300 text-xl">radio_button_unchecked</span>
                <div>
                  <div className="text-xs font-bold text-slate-600">STAGES 3 - 9: Health Profiles, Food Search, Meal Logging, Trends, AI Studio &amp; Admin</div>
                  <div className="text-xs text-slate-400">Strict one-stage-at-a-time execution with full automated verification.</div>
                </div>
              </div>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Queued</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border-subtle py-4 px-4 text-center text-xs text-slate-400">
        <p>NutriTrack Health Analytics &bull; Pure Light Mode &bull; Production Architecture</p>
      </footer>
    </div>
  );
}
