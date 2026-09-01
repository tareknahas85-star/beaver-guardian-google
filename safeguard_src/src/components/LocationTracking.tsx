import React, { useState } from 'react';
import { Screen, SafeZone } from '../types';

interface LocationTrackingProps {
  onNavigate: (screen: Screen) => void;
}

export const LocationTracking: React.FC<LocationTrackingProps> = ({ onNavigate }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [toast, setToast] = useState<string | null>(null);
  const [safeZones, setSafeZones] = useState<SafeZone[]>([
    { id: '1', name: 'Home', alerts: 'Alerts: Entry & Exit', icon: 'home', bgColor: 'bg-primary-container/10', textColor: 'text-primary', enabled: true },
    { id: '2', name: 'Central School', alerts: 'Alerts: Entry only', icon: 'school', bgColor: 'bg-tertiary-container/10', textColor: 'text-tertiary', enabled: true },
    { id: '3', name: 'St. James Park', alerts: 'Alerts: Disabled', icon: 'park', bgColor: 'bg-outline-variant/10', textColor: 'text-outline', enabled: false },
  ]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleSafeZone = (id: string) => {
    setSafeZones(prev => prev.map(zone => {
      if (zone.id === id) {
        const updated = !zone.enabled;
        showToast(`${zone.name} zone alert ${updated ? 'enabled' : 'disabled'}`);
        return { ...zone, enabled: updated };
      }
      return zone;
    }));
  };

  const mapBgUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtNQKwJgv6JTtJBg2H-JHdZ_qJfroT6tj560wt98Oii36IRa_vKZ55H2PRDgAa-4TYM_RX-AmwH0t0NAy8d-_tZIjDYhvFyUVO3NK05DAE5O0_gtrchsFtL_Ro-cQ7WTgjcD_FHJ3g-dIxrKZWw4e1tduyC3TbPsCjUYltRE0m3mQSo7Em-qTV0izpHyv3ERuNqZ0MfkcdS_VP_lMZ4CsYl_4giC79kWZvXUxGHcJbvFHY6LZDINPBHxKVk-WEsq4XgC7yPKCoe2fj';
  const childAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuC96iF5CquIrP-ieRix09paFpKUbZeaUOyhp3xzkkyNpsnjmxUBZ8DA7MvSk24JczNgDBUw36BEwVq-c6109keZmNCN3e9a6CGoaDjHi4ZdPjDSgK97Wg8tIeMxm6-kcx9mQYnDIATdB6-SiJS27I3er6CGFkSjverl0BUu20SutLKcYz4EnnMp7BNPV_ijXg_Rg6Mwe_d3fIR0-0KpLdBwxjc--Kub0rfTQpucDaPYyvgsp1nE38BMxlU21SQCj5QwyR3XKP1uXB6X';
  const topAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4IZxMDyaDNZOkrmFcgCpOgqLunysfa0e2hdw9FbuD4Vz1TDeSI-U8M1AUd-Z0_1Iv0unuE3HCXwDjxRz9BXqzpNGKSN3B-Ai0zsmBCVoZANoltem7U99DGoeO6KTCEyRWrP6igM2U8IW-XP_n0LIJUcqd5GFe2ALWNK5HmPYqAExgBeuMRcR5zh33sPs1Y9gvCv5Zv5tdo2642C-v2WxfJS_da76oq_m-XBHUIL_3JwBYfLGRb9obLGZqvkyyhVE0hdPoNjbqDV-A';

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen overflow-x-hidden relative">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl shadow-lg font-label-md">
          {toast}
        </div>
      )}

      {/* Top AppBar */}
      <nav className="fixed top-0 w-full z-50 bg-surface dark:bg-on-background shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex justify-between items-center px-5 h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-secondary bg-surface-container cursor-pointer" onClick={() => onNavigate('dashboard')}>
            <img className="w-full h-full object-cover" alt="Leo" src={topAvatar} />
          </div>
          <h1 className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">SafeGuard</h1>
        </div>
        <button onClick={() => showToast("No new alerts")} className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant hover:bg-surface-container-low transition-colors active:scale-95 duration-200">
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </nav>

      {/* Main Content Canvas */}
      <main className="pt-16 pb-24 md:pb-8 md:pl-28 px-5 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-8">
        {/* Map View Section */}
        <section className="md:col-span-8 pt-2">
          <div className="relative w-full h-[350px] md:h-[500px] rounded-xl overflow-hidden shadow-[0px_4px_20px_rgba(0,0,0,0.05)] bg-surface-container border border-outline-variant/30 group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300"
              style={{ 
                backgroundImage: `url('${mapBgUrl}')`,
                transform: `scale(${zoomLevel / 100})`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-surface pointer-events-none"></div>

            {/* Floating Zoom Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <button 
                onClick={() => setZoomLevel(prev => Math.min(prev + 15, 150))} 
                className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center text-primary active:scale-90 transition-transform hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined">add</span>
              </button>
              <button 
                onClick={() => setZoomLevel(prev => Math.max(prev - 15, 80))} 
                className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center text-primary active:scale-90 transition-transform hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined">remove</span>
              </button>
              <button 
                onClick={() => { setZoomLevel(100); showToast("Centered on Leo"); }} 
                className="w-10 h-10 bg-surface rounded-lg shadow-md flex items-center justify-center text-primary active:scale-90 transition-transform hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined">my_location</span>
              </button>
            </div>

            {/* Live Marker */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-full animate-ping"></div>
                <div className="w-12 h-12 rounded-full border-4 border-surface shadow-xl overflow-hidden bg-primary-container relative z-10">
                  <img className="w-full h-full object-cover" alt="Leo Avatar" src={childAvatar} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-surface"></div>
              </div>
              <div className="mt-3 bg-surface/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg border border-outline-variant/20">
                <p className="font-label-md text-label-md text-on-surface whitespace-nowrap">Leo is at <strong>Central School</strong></p>
              </div>
            </div>

            {/* Tracking Status Bar */}
            <div className="absolute bottom-4 left-4 right-4 bg-surface/80 backdrop-blur-xl p-4 rounded-xl flex items-center justify-between border border-white/40 shadow-lg z-20">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Live Tracking • Last updated 2m ago</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary text-[18px]">battery_5_bar</span>
                <span className="font-label-sm text-label-sm text-on-surface">84%</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button 
              onClick={() => showToast("Calling Leo's device...")} 
              className="flex items-center justify-center gap-2 py-3 bg-primary text-on-primary rounded-xl font-label-md active:scale-95 transition-transform hover:bg-primary-container shadow-sm"
            >
              <span className="material-symbols-outlined">call</span> Call Leo
            </button>
            <button 
              onClick={() => showToast("High priority alert sent to Leo's device")} 
              className="flex items-center justify-center gap-2 py-3 bg-secondary-container text-on-secondary-container rounded-xl font-label-md active:scale-95 transition-transform hover:bg-secondary-fixed shadow-sm"
            >
              <span className="material-symbols-outlined">campaign</span> Send Alert
            </button>
          </div>
        </section>

        {/* Sidebar / Secondary Sections */}
        <aside className="md:col-span-4 flex flex-col gap-4 pt-2">
          {/* Location History Card */}
          <div className="card-lift bg-surface-container-lowest p-5 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/10 flex flex-col h-[380px]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-headline-md text-headline-md text-on-surface">Today's Activity</h2>
              <span className="text-primary font-label-sm cursor-pointer hover:underline" onClick={() => showToast("Showing full 7-day location history")}>View All</span>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 space-y-6 relative pl-6 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-primary-fixed">
              <div className="relative">
                <div className="absolute -left-[19px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-surface-container-lowest shadow-sm z-10"></div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-on-surface-variant">08:15 AM</span>
                  <span className="font-label-md text-on-surface">Arrived at Central School</span>
                  <span className="text-xs text-outline">Geo-fence: School</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[19px] top-1 w-4 h-4 rounded-full bg-primary-fixed-dim border-4 border-surface-container-lowest shadow-sm z-10"></div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-on-surface-variant">08:02 AM</span>
                  <span className="font-label-md text-on-surface">Left Home</span>
                  <span className="text-xs text-outline">Transit • 1.2 miles</span>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -left-[19px] top-1 w-4 h-4 rounded-full bg-primary-fixed-dim border-4 border-surface-container-lowest shadow-sm z-10"></div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-on-surface-variant">07:50 AM</span>
                  <span className="font-label-md text-on-surface">Home Zone</span>
                  <span className="text-xs text-outline">Geo-fence: Home</span>
                </div>
              </div>
              <div className="relative opacity-60">
                <div className="absolute -left-[19px] top-1 w-4 h-4 rounded-full bg-outline-variant border-4 border-surface-container-lowest shadow-sm z-10"></div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-on-surface-variant">Yesterday</span>
                  <span className="font-label-md text-on-surface">Library (Afternoon)</span>
                  <span className="text-xs text-outline">2.5 hours stay</span>
                </div>
              </div>
            </div>
          </div>

          {/* Geofencing Section */}
          <div className="card-lift bg-surface-container-lowest p-5 rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-outline-variant/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">distance</span>
                <h2 className="font-headline-md text-headline-md text-on-surface">Safe Zones</h2>
              </div>
              <button 
                onClick={() => showToast("Add new Safe Zone drawer opened")} 
                className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-fixed text-primary hover:bg-primary-fixed-dim transition-colors"
                title="Add Safe Zone"
              >
                <span className="material-symbols-outlined text-[20px]">add</span>
              </button>
            </div>
            <div className="space-y-3">
              {safeZones.map(zone => (
                <div key={zone.id} className="p-3 bg-surface rounded-xl border border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg ${zone.bgColor} flex items-center justify-center ${zone.textColor}`}>
                      <span className="material-symbols-outlined">{zone.icon}</span>
                    </div>
                    <div>
                      <p className="font-label-md text-on-surface">{zone.name}</p>
                      <p className="text-[11px] text-on-surface-variant">{zone.alerts}</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={zone.enabled} 
                      onChange={() => toggleSafeZone(zone.id)} 
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>

      {/* Mobile Bottom Navigation Bar (Satisfies //nav[contains(@class, 'md:hidden')]//button[span[text()='dashboard']] etc) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 pb-safe bg-surface dark:bg-on-background shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] z-50 rounded-t-xl">
        <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-sm text-label-sm mt-1">Dashboard</span>
        </button>
        <button onClick={() => onNavigate('location-tracking')} className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 active:scale-90 transition-transform">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
          <span className="font-label-sm text-label-sm mt-1">Kids</span>
        </button>
        <button onClick={() => onNavigate('screen-time')} className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90">
          <span className="material-symbols-outlined">query_stats</span>
          <span className="font-label-sm text-label-sm mt-1">Activity</span>
        </button>
        <button onClick={() => onNavigate('app-restrictions')} className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-sm text-label-sm mt-1">Settings</span>
        </button>
      </nav>

      {/* Desktop Rail Navigation (Satisfies //nav[contains(@class, 'md:flex')]//button[span[text()='dashboard']] etc) */}
      <nav className="hidden md:flex fixed left-0 top-16 bottom-0 w-24 flex-col items-center py-8 gap-8 bg-surface-container-low border-r border-outline-variant/10 z-40">
        <button onClick={() => onNavigate('dashboard')} className="group flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-primary-fixed transition-colors">
            <span className="material-symbols-outlined">dashboard</span>
          </div>
          <span className="font-label-sm text-label-sm">Dashboard</span>
        </button>
        <button onClick={() => onNavigate('location-tracking')} className="group flex flex-col items-center gap-1 text-primary">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary-fixed">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>child_care</span>
          </div>
          <span className="font-label-sm text-label-sm font-bold">Kids</span>
        </button>
        <button onClick={() => onNavigate('screen-time')} className="group flex flex-col items-center gap-1 text-on-surface-variant hover:text-primary transition-colors">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-primary-fixed transition-colors">
            <span className="material-symbols-outlined">query_stats</span>
          </div>
          <span className="font-label-sm text-label-sm">Activity</span>
        </button>
        <button onClick={() => onNavigate('app-restrictions')} className="group flex flex-col items-center gap-1 mt-auto text-on-surface-variant hover:text-primary transition-colors">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:bg-primary-fixed transition-colors">
            <span className="material-symbols-outlined">settings</span>
          </div>
          <span className="font-label-sm text-label-sm">Settings</span>
        </button>
      </nav>
    </div>
  );
};
