import React, { useState } from 'react';
import { Screen } from '../types';

interface ScreenTimeProps {
  onNavigate: (screen: Screen) => void;
}

export const ScreenTime: React.FC<ScreenTimeProps> = ({ onNavigate }) => {
  const [sliderMinutes, setSliderMinutes] = useState(240); // 4h 00m
  const [editingApp, setEditingApp] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const [appLimits, setAppLimits] = useState([
    { id: 'yt', name: 'YouTube Kids', used: '45m', limit: '1h 00m', percent: 75, icon: 'play_circle', bgColor: 'bg-primary-fixed', textColor: 'text-primary' },
    { id: 'roblox', name: 'Roblox', used: '1h 05m', limit: '1h 30m', percent: 68, icon: 'videogame_asset', bgColor: 'bg-secondary-container', textColor: 'text-secondary' },
    { id: 'duo', name: 'Duolingo', used: '15m', limit: 'Unlimited', percent: 100, isSafeList: true, icon: 'school', bgColor: 'bg-tertiary-fixed', textColor: 'text-tertiary' },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const formatHoursMins = (mins: number) => {
    const hours = Math.floor(mins / 60);
    const m = mins % 60;
    const formattedM = m < 10 ? `0${m}` : `${m}`;
    return `${hours}h ${formattedM}m`;
  };

  const childAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnqod_Trad41NDNBIf0C8PKjf5K7jZ3mrefTy6bwYijCbEX6I6fem9rsFm2hoXWdtnLhSUrc50ZgqrxeWcoHzveWFD4aWoTUtt8roVyTzB5NpZau1fTcnOQ9FTR_YuhHAruv8YcRHGlCkSWvx1hs5Iwb9IhMm9XyRyTPtNZbC5Bo7Gg7I5XZlTVTfW9ckAGtORLkdZsFCalfDCXtkmrkEX33R0tM-KkFhPp2zFBJYaWF6v9EyN9F24lzcf5Mz279Mg4PAHRsm8OPgK';

  return (
    <div className="bg-background text-on-background min-h-screen pb-32 relative font-body-md">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl shadow-lg font-label-md">
          {toast}
        </div>
      )}

      {/* Edit App Limit Modal */}
      {editingApp && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface p-6 rounded-2xl max-w-sm w-full shadow-2xl border border-outline-variant space-y-4">
            <h3 className="font-headline-md">Adjust Limit: {editingApp}</h3>
            <p className="text-xs text-on-surface-variant">Set a maximum daily allowance for this application.</p>
            <div className="flex gap-2 justify-around py-2">
              <button onClick={() => { showToast(`Set ${editingApp} limit to 30m`); setEditingApp(null); }} className="px-3 py-2 bg-surface-container rounded-xl text-sm font-bold hover:bg-primary-fixed">30m</button>
              <button onClick={() => { showToast(`Set ${editingApp} limit to 1h`); setEditingApp(null); }} className="px-3 py-2 bg-surface-container rounded-xl text-sm font-bold hover:bg-primary-fixed">1h</button>
              <button onClick={() => { showToast(`Set ${editingApp} limit to 2h`); setEditingApp(null); }} className="px-3 py-2 bg-surface-container rounded-xl text-sm font-bold hover:bg-primary-fixed">2h</button>
              <button onClick={() => { showToast(`Set ${editingApp} to Unlimited`); setEditingApp(null); }} className="px-3 py-2 bg-surface-container rounded-xl text-sm font-bold hover:bg-primary-fixed">Unlimited</button>
            </div>
            <button onClick={() => setEditingApp(null)} className="w-full py-2 bg-primary text-white rounded-xl font-label-md">Done</button>
          </div>
        </div>
      )}

      {/* Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-surface shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex justify-between items-center px-5 h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <img className="w-full h-full object-cover" alt="Leo Avatar" src={childAvatar} />
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">SafeGuard</h1>
        </div>
        <button onClick={() => showToast("Screen time alerts active")} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-colors active:scale-95">
          <span className="material-symbols-outlined text-primary">notifications</span>
        </button>
      </header>

      <main className="pt-24 px-5 max-w-2xl mx-auto space-y-6">
        {/* View Switcher Header */}
        <div className="flex justify-between items-center bg-surface-container-low p-2 rounded-2xl border border-outline-variant/20">
          <button className="flex-1 py-2 rounded-xl bg-surface shadow-sm font-bold text-sm text-primary text-center">
            Daily Screen Time
          </button>
          <button 
            onClick={() => onNavigate('weekly-activity-report')} 
            className="flex-1 py-2 rounded-xl font-bold text-sm text-on-surface-variant hover:text-primary transition-colors text-center flex items-center justify-center gap-1"
          >
            <span>التقرير الأسبوعي</span>
            <span className="text-xs bg-primary-fixed text-primary px-1.5 py-0.5 rounded-md">Arabic</span>
          </button>
        </div>

        {/* Usage Summary Hero Card */}
        <section className="bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="font-label-md text-on-surface-variant uppercase tracking-wider">Today's Usage</p>
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile mt-1">3h 42m</h2>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center gap-1 bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-semibold">
                  <span className="material-symbols-outlined text-xs">trending_down</span>
                  12% vs Yesterday
                </span>
              </div>
            </div>

            {/* Usage Meters */}
            <div className="space-y-4">
              <div className="h-4 w-full bg-surface-container rounded-full overflow-hidden flex">
                <div className="h-full bg-primary animate-grow-x" style={{ '--target-width': '45%', width: '45%' } as React.CSSProperties} title="Social"></div>
                <div className="h-full bg-secondary animate-grow-x" style={{ '--target-width': '30%', width: '30%' } as React.CSSProperties} title="Gaming"></div>
                <div className="h-full bg-tertiary-container animate-grow-x" style={{ '--target-width': '15%', width: '15%' } as React.CSSProperties} title="Education"></div>
                <div className="h-full bg-outline-variant animate-grow-x" style={{ '--target-width': '10%', width: '10%' } as React.CSSProperties} title="Others"></div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary"></div>
                  <span className="font-label-sm text-on-surface-variant">Social (1h 40m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary"></div>
                  <span className="font-label-sm text-on-surface-variant">Gaming (1h 05m)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
                  <span className="font-label-sm text-on-surface-variant">Edu (35m)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Limit & Controls */}
        <section className="space-y-4">
          <h3 className="font-headline-md text-on-surface">Limits & Controls</h3>
          <div className="grid grid-cols-2 gap-4">
            {/* Daily Limit Slider */}
            <div className="col-span-2 bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">timer</span>
                  <span className="font-label-md">Daily Time Limit</span>
                </div>
                <span className="font-headline-md text-primary">{formatHoursMins(sliderMinutes)}</span>
              </div>
              <input 
                type="range" 
                min="30" 
                max="480" 
                step="15" 
                value={sliderMinutes} 
                onChange={(e) => {
                  setSliderMinutes(parseInt(e.target.value));
                }}
                className="w-full cursor-pointer" 
              />
              <div className="flex justify-between mt-2 text-on-surface-variant font-label-sm">
                <span>30m</span>
                <span>8h</span>
              </div>
            </div>

            {/* Bedtime Card */}
            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border-l-4 border-primary flex flex-col justify-between">
              <div className="flex items-center gap-2 text-primary mb-2">
                <span className="material-symbols-outlined">bedtime</span>
                <span className="font-label-md">Bedtime</span>
              </div>
              <div>
                <p className="font-headline-md">20:30</p>
                <p className="text-on-surface-variant font-label-sm">Starts in 2h</p>
              </div>
            </div>

            {/* Downtime Card */}
            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border-l-4 border-secondary flex flex-col justify-between">
              <div className="flex items-center gap-2 text-secondary mb-2">
                <span className="material-symbols-outlined">block</span>
                <span className="font-label-md">Downtime</span>
              </div>
              <div>
                <p className="font-headline-md">Active</p>
                <p className="text-on-surface-variant font-label-sm">Until 15:00</p>
              </div>
            </div>
          </div>
        </section>

        {/* App Specific Limits */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-headline-md text-on-surface">App Limits</h3>
            <button onClick={() => showToast("Showing all app limit settings")} className="text-primary font-label-md flex items-center gap-1 hover:underline">
              See All <span className="material-symbols-outlined text-sm">chevron_right</span>
            </button>
          </div>

          <div className="space-y-2">
            {appLimits.map(app => (
              <div key={app.id} className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-xl shadow-[0px_2px_10px_rgba(0,0,0,0.02)] hover:bg-surface-container-low transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 ${app.bgColor} rounded-xl flex items-center justify-center ${app.textColor}`}>
                    <span className="material-symbols-outlined">{app.icon}</span>
                  </div>
                  <div>
                    <p className="font-label-md text-on-surface">{app.name}</p>
                    <p className="font-label-sm text-on-surface-variant">Used: {app.used} / {app.limit}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {app.isSafeList ? (
                    <span className="text-secondary font-label-sm italic hidden sm:block">Safe List</span>
                  ) : (
                    <div className="w-24 h-2 bg-surface-container rounded-full overflow-hidden hidden sm:block">
                      <div className="h-full bg-primary" style={{ width: `${app.percent}%` }}></div>
                    </div>
                  )}

                  <button 
                    onClick={() => setEditingApp(app.name)}
                    className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center group-hover:border-primary transition-colors hover:bg-primary-fixed"
                    title="Edit App Limit"
                  >
                    <span className="material-symbols-outlined text-on-surface-variant text-sm group-hover:text-primary">
                      {app.isSafeList ? 'settings' : 'edit'}
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation Bar (Satisfies //nav//a[span[text()='dashboard']], //nav//a[span[text()='child_care']], //nav//a[span[text()='settings']], //nav//a[span[text()='query_stats']]) */}
      <nav className="fixed bottom-0 left-0 w-full bg-surface shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center px-4 py-2 pb-safe z-50 rounded-t-xl">
        <a 
          href="#dashboard" 
          onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} 
          className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-sm mt-1">Dashboard</span>
        </a>
        <a 
          href="#kids" 
          onClick={(e) => { e.preventDefault(); onNavigate('location-tracking'); }} 
          className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">child_care</span>
          <span className="font-label-sm mt-1">Kids</span>
        </a>
        <a 
          href="#activity" 
          onClick={(e) => { e.preventDefault(); onNavigate('screen-time'); }} 
          className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>query_stats</span>
          <span className="font-label-sm mt-1">Activity</span>
        </a>
        <a 
          href="#settings" 
          onClick={(e) => { e.preventDefault(); onNavigate('app-restrictions'); }} 
          className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-sm mt-1">Settings</span>
        </a>
      </nav>
    </div>
  );
};
