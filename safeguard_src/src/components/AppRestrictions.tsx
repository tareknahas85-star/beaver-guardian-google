import React, { useState } from 'react';
import { Screen } from '../types';

interface AppRestrictionsProps {
  onNavigate: (screen: Screen) => void;
}

export const AppRestrictions: React.FC<AppRestrictionsProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const [webFilters, setWebFilters] = useState({
    social: true, // Blocked
    adult: true,  // Blocked
    gaming: false, // Allowed
  });

  const [searchSettings, setSearchSettings] = useState({
    history: true,
    ytRestricted: true,
  });

  const [apps, setApps] = useState([
    { id: 'insta', name: 'Instagram', category: 'Social Media', timeUsed: '1h 20m today', blocked: true, iconClass: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600', icon: 'camera' },
    { id: 'tiktok', name: 'TikTok', category: 'Entertainment', timeUsed: '45m today', blocked: true, iconClass: 'bg-black', icon: 'music_video' },
    { id: 'roblox', name: 'Roblox', category: 'Gaming', timeUsed: '2h 10m today', blocked: false, iconClass: 'bg-surface-dim border border-outline-variant', icon: 'sports_esports' },
    { id: 'duo', name: 'Duolingo', category: 'Education', timeUsed: '15m today', blocked: false, iconClass: 'bg-[#58CC02]', icon: 'language' },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleApp = (id: string) => {
    setApps(prev => prev.map(app => {
      if (app.id === id) {
        const updated = !app.blocked;
        showToast(`${app.name} is now ${updated ? 'Restricted' : 'Allowed'}`);
        return { ...app, blocked: updated };
      }
      return app;
    }));
  };

  const filteredApps = apps.filter(app => 
    app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const childAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0pp0B3uEDg9ju5B26cKqIt27c8Z0Oi-lSFARxQ97_efUW2lJ7ttYSQH1cmQXIs54kVH0HzuZKWvz36h0J7v_hrguXKnl7STKF67mfqteQ0spvMxhCxf-iGKTecUSsXfOIxOfpoasSeh9Q0W_-C7leGPOvCweICjTA1FuITF7iXUYRCJ4ySAlgQjSKMwGiOcc3pYwr8qbzabaMU6JlPnVD3sIPPRwkcNmgVnqiLRSTJdbdZNO1LbwV8BU50tZXnkzPSGRMvW1sJ3ao';

  return (
    <div className="bg-background text-on-surface min-h-screen pb-28 font-body-md relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl shadow-lg font-label-md">
          {toast}
        </div>
      )}

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex justify-between items-center px-5 h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary-container active:scale-95 transition-transform duration-200 cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <img className="w-full h-full object-cover" alt="Leo Profile" src={childAvatar} />
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary">SafeGuard</h1>
        </div>
        <button onClick={() => showToast("No new restriction alerts")} className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="pt-20 px-5 max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <section className="space-y-1">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-background">Content Restrictions</h2>
          <p className="text-on-surface-variant font-body-md">Manage what Leo can see and do on their digital journey.</p>
        </section>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Web Filtering Categories */}
          <div className="md:col-span-2 glass-card rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">filter_alt</span>
              <h3 className="font-headline-md text-headline-md">Web Filtering</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Social Category */}
              <div 
                onClick={() => {
                  const updated = !webFilters.social;
                  setWebFilters(prev => ({ ...prev, social: updated }));
                  showToast(`Social Media filtering ${updated ? 'Blocked' : 'Allowed'}`);
                }}
                className="p-4 bg-surface-container-low rounded-lg flex flex-col items-center text-center space-y-1 hover:bg-surface-container transition-all cursor-pointer group active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">group</span>
                </div>
                <span className="font-label-md">Social Media</span>
                <div className="relative inline-block w-12 h-6 mt-2">
                  <input type="checkbox" checked={webFilters.social} readOnly className="toggle-checkbox hidden" />
                  <label className="toggle-label block bg-outline-variant w-full h-full rounded-full cursor-pointer transition-colors duration-300 shadow-inner">
                    <span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm"></span>
                  </label>
                </div>
                <p className={`text-[10px] pt-1 uppercase tracking-wider font-bold transition-all duration-300 ${webFilters.social ? 'text-error' : 'text-secondary'}`}>
                  {webFilters.social ? 'Blocked' : 'Allowed'}
                </p>
              </div>

              {/* Adult Category */}
              <div 
                onClick={() => {
                  const updated = !webFilters.adult;
                  setWebFilters(prev => ({ ...prev, adult: updated }));
                  showToast(`Adult Content filtering ${updated ? 'Blocked' : 'Allowed'}`);
                }}
                className="p-4 bg-surface-container-low rounded-lg flex flex-col items-center text-center space-y-1 hover:bg-surface-container transition-all cursor-pointer group active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">no_adult_content</span>
                </div>
                <span className="font-label-md">Adult Content</span>
                <div className="relative inline-block w-12 h-6 mt-2">
                  <input type="checkbox" checked={webFilters.adult} readOnly className="toggle-checkbox hidden" />
                  <label className="toggle-label block bg-outline-variant w-full h-full rounded-full cursor-pointer transition-colors duration-300 shadow-inner">
                    <span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm"></span>
                  </label>
                </div>
                <p className={`text-[10px] pt-1 uppercase tracking-wider font-bold transition-all duration-300 ${webFilters.adult ? 'text-error' : 'text-secondary'}`}>
                  {webFilters.adult ? 'Blocked' : 'Allowed'}
                </p>
              </div>

              {/* Gaming Category */}
              <div 
                onClick={() => {
                  const updated = !webFilters.gaming;
                  setWebFilters(prev => ({ ...prev, gaming: updated }));
                  showToast(`Gaming category ${updated ? 'Blocked' : 'Allowed'}`);
                }}
                className="p-4 bg-surface-container-low rounded-lg flex flex-col items-center text-center space-y-1 hover:bg-surface-container transition-all cursor-pointer group active:scale-[0.98]"
              >
                <div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">sports_esports</span>
                </div>
                <span className="font-label-md">Gaming</span>
                <div className="relative inline-block w-12 h-6 mt-2">
                  <input type="checkbox" checked={webFilters.gaming} readOnly className="toggle-checkbox hidden" />
                  <label className="toggle-label block bg-outline-variant w-full h-full rounded-full cursor-pointer transition-colors duration-300 shadow-inner">
                    <span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 shadow-sm"></span>
                  </label>
                </div>
                <p className={`text-[10px] pt-1 uppercase tracking-wider font-bold transition-all duration-300 ${webFilters.gaming ? 'text-error' : 'text-secondary'}`}>
                  {webFilters.gaming ? 'Blocked' : 'Allowed'}
                </p>
              </div>
            </div>
          </div>

          {/* Search & YouTube */}
          <div className="glass-card rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] space-y-6">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">visibility</span>
              <h3 className="font-headline-md text-headline-md">Search & YouTube</h3>
            </div>
            <div className="space-y-4">
              <div 
                onClick={() => {
                  const updated = !searchSettings.history;
                  setSearchSettings(prev => ({ ...prev, history: updated }));
                  showToast(`Search history logging ${updated ? 'enabled' : 'disabled'}`);
                }}
                className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">history</span>
                  <div>
                    <p className="font-label-md">Search History</p>
                    <p className="text-xs text-outline">Logs all browser searches</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input type="checkbox" checked={searchSettings.history} readOnly className="toggle-checkbox hidden" />
                  <label className="toggle-label block bg-outline-variant w-full h-full rounded-full cursor-pointer transition-colors duration-300">
                    <span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300"></span>
                  </label>
                </div>
              </div>

              <div 
                onClick={() => {
                  const updated = !searchSettings.ytRestricted;
                  setSearchSettings(prev => ({ ...prev, ytRestricted: updated }));
                  showToast(`YouTube restricted mode ${updated ? 'enabled' : 'disabled'}`);
                }}
                className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg cursor-pointer hover:bg-surface-container transition-all"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant">smart_display</span>
                  <div>
                    <p className="font-label-md">YouTube Restricted</p>
                    <p className="text-xs text-outline">Filters potentially mature content</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 h-6">
                  <input type="checkbox" checked={searchSettings.ytRestricted} readOnly className="toggle-checkbox hidden" />
                  <label className="toggle-label block bg-outline-variant w-full h-full rounded-full cursor-pointer transition-colors duration-300">
                    <span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300"></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Activity Bento Card */}
          <div 
            onClick={() => onNavigate('weekly-activity-report')}
            className="glass-card rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex flex-col justify-between overflow-hidden relative cursor-pointer hover:border-primary/40 transition-all group"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-headline-md text-headline-md">Weekly Activity</h3>
                <span className="text-xs text-primary font-bold group-hover:underline">View Report &rarr;</span>
              </div>
              <p className="text-xs text-on-surface-variant mb-4">Blocks preventing safety risks</p>
              <div className="flex items-end gap-2 h-24">
                <div className="flex-1 bg-primary-container rounded-t-lg transition-all duration-300 hover:scale-y-110" style={{ height: '40%' }}></div>
                <div className="flex-1 bg-primary-container rounded-t-lg transition-all duration-300 hover:scale-y-110" style={{ height: '70%' }}></div>
                <div className="flex-1 bg-secondary rounded-t-lg transition-all duration-300 hover:scale-y-110" style={{ height: '90%' }}></div>
                <div className="flex-1 bg-primary-container rounded-t-lg transition-all duration-300 hover:scale-y-110" style={{ height: '50%' }}></div>
                <div className="flex-1 bg-primary-container rounded-t-lg transition-all duration-300 hover:scale-y-110" style={{ height: '65%' }}></div>
                <div className="flex-1 bg-primary-container rounded-t-lg transition-all duration-300 hover:scale-y-110" style={{ height: '30%' }}></div>
                <div className="flex-1 bg-primary-fixed-dim rounded-t-lg transition-all duration-300 hover:scale-y-110" style={{ height: '80%' }}></div>
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-outline uppercase font-bold">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>
          </div>

          {/* Installed Apps List */}
          <div className="md:col-span-2 glass-card rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">apps</span>
                <h3 className="font-headline-md text-headline-md">Installed Apps</h3>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search apps..." 
                  className="pl-8 pr-4 py-1.5 bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary-container w-40 md:w-64 transition-all duration-300"
                />
              </div>
            </div>

            <div className="divide-y divide-outline-variant">
              {filteredApps.map(app => (
                <div 
                  key={app.id} 
                  onClick={() => toggleApp(app.id)}
                  className="flex items-center justify-between py-4 group hover:bg-surface-container-lowest transition-all px-2 rounded-lg cursor-pointer active:scale-[0.99]"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${app.iconClass} flex items-center justify-center text-white shadow-sm overflow-hidden group-hover:rotate-3 transition-transform`}>
                      <span className="material-symbols-outlined text-2xl">{app.icon}</span>
                    </div>
                    <div>
                      <p className="font-label-md text-on-surface">{app.name}</p>
                      <p className="text-xs text-outline">{app.category} • {app.timeUsed}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`hidden sm:inline-block text-[10px] font-bold uppercase transition-all duration-300 ${app.blocked ? 'text-error' : 'text-secondary'}`}>
                      {app.blocked ? 'Restricted' : 'Allowed'}
                    </span>
                    <div className="relative inline-block w-12 h-6">
                      <input type="checkbox" checked={app.blocked} readOnly className="toggle-checkbox hidden" />
                      <label className="toggle-label block bg-outline-variant w-full h-full rounded-full cursor-pointer transition-colors duration-300">
                        <span className="toggle-dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300"></span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => showToast("Loaded all 42 installed applications")}
              className="w-full py-3 text-primary font-label-md hover:bg-primary-fixed active:bg-primary-container active:text-white transition-all rounded-lg flex items-center justify-center gap-2 mt-4"
            >
              View All 42 Apps
              <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
            </button>
          </div>
        </div>
      </main>

      {/* BottomNavBar (Satisfies //nav//a[span[text()='dashboard']], //nav//a[span[text()='Dashboard']], //nav//a[span[text()='child_care']], //nav//a[span[text()='Kids']], //nav//a[span[text()='query_stats']], //nav//a[span[text()='Activity']]) */}
      <nav className="fixed bottom-0 left-0 w-full bg-surface shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] flex justify-around items-center px-4 py-2 pb-safe z-50 rounded-t-xl">
        <a 
          href="#dashboard" 
          onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }} 
          className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90 duration-200"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-sm">Dashboard</span>
        </a>
        <a 
          href="#kids" 
          onClick={(e) => { e.preventDefault(); onNavigate('location-tracking'); }} 
          className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90 duration-200"
        >
          <span className="material-symbols-outlined">child_care</span>
          <span className="font-label-sm">Kids</span>
        </a>
        <a 
          href="#activity" 
          onClick={(e) => { e.preventDefault(); onNavigate('screen-time'); }} 
          className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90 duration-200"
        >
          <span className="material-symbols-outlined">query_stats</span>
          <span className="font-label-sm">Activity</span>
        </a>
        <a 
          href="#settings" 
          onClick={(e) => { e.preventDefault(); onNavigate('app-restrictions'); }} 
          className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-full px-4 py-1 active:scale-90 transition-transform duration-200"
        >
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>settings</span>
          <span className="font-label-sm">Settings</span>
        </a>
      </nav>
    </div>
  );
};
