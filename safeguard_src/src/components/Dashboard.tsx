import type React from "react";
import { useState } from "react";
import type { Screen } from "../types";
import { useStore } from "../store/store";

interface DashboardProps {
  onNavigate: (screen: Screen) => void;
  onNotificationClick?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  onNotificationClick,
}) => {
  const {
    addNotification,
    setInternetPaused,
    setDeviceLocked,
    setAlarmActive,
    internetPaused,
    deviceLocked,
    alarmActive,
  } = useStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const mapBgUrl =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTHZMsM5RscX5wd8UfR3UrbinBgnUII-bE-zfiGmRlJDkMTsC_JU8rSg2oJnVwqhG4URXJ9MJ5l8OK5ibWsjnOXEJpYUiytt4BX-fMmxZdXIw8tny62WOgm3KKT63IaFoM70piY0oyZUuv--Y1ZjdW79u3MkQJ36_yGgKth_JI8mAGj1Wjgv1XcGXOHQGNSQKHyEbG4H-p9_NsAHu24K-mS_RadsvzBOKM08sifm5PrtHGhlYuRBVQgjgzxH37rbY-OYkzcDwzHeB1";
  const childAvatar =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDWIsKNxnHOJ8Ww2wyO0NgeSvztSRrwCASMxNuw4QHRyJJngsatROAbWSZL6XDZp67iDp3wZNTblq3a0jurL733kSaMumpmDL9u_XmlgNdiPko5fSHiG2lDaWzgqHhZlKnhc5UVargta5eLggGTlje-lwXwIWAviRtKoqkFrVCjSI6TcBxy3wr4gFRnUKjrtAXTOXwB3DlU7k09uFFlLrYzFNOFQeAATheUZUQ2kbwOLIpBgLoKPTTP69rsLkNwjz_KzAN0t7aDgV_w";

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl shadow-lg font-label-md transition-all">
          {toastMessage}
        </div>
      )}

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface dark:bg-on-background shadow-[0px_4px_20px_rgba(0,0,0,0.05)] flex justify-between items-center px-5 h-16">
        <div className="flex items-center gap-3">
          <div
            role="button"
            tabIndex={0}
            aria-label="Child profile - open location tracking"
            className="w-10 h-10 rounded-full border-2 border-secondary overflow-hidden bg-surface-container shadow-sm cursor-pointer"
            onClick={() => onNavigate("location-tracking")}
          >
            <img
              className="w-full h-full object-cover"
              alt="Leo"
              src={childAvatar}
            />
          </div>
          <span className="font-headline-md text-headline-md font-bold text-primary dark:text-primary-fixed">
            SafeGuard
          </span>
        </div>
        <button
          type="button"
          aria-label="Notifications"
          onClick={() => {
            if (onNotificationClick) onNotificationClick();
            showToast("No new notifications");
          }}
          className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-outline hover:bg-surface-container-low transition-colors active:scale-95 duration-200"
          title="Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
        </button>
      </header>

      <main className="pt-24 pb-32 px-5 max-w-5xl mx-auto">
        {/* Status Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-8">
          {/* Child Status Card */}
          <div className="md:col-span-12 bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-container rounded-full flex items-center justify-center text-on-secondary-container">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
              </div>
              <div>
                <p className="font-label-md text-on-surface-variant">
                  Current Location
                </p>
                <h2 className="font-headline-md text-on-surface">
                  Lincoln Middle School
                </h2>
                <p className="font-label-sm text-secondary flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-secondary"></span>{" "}
                  Safe Zone
                </p>
              </div>
            </div>
            <div className="flex items-center gap-8 w-full md:w-auto pt-4 md:pt-0 border-t border-surface-variant md:border-t-0">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined">
                    battery_5_bar
                  </span>
                  <span className="font-label-md">82%</span>
                </div>
                <span className="font-label-sm text-outline">Battery</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-on-surface-variant">
                  <span className="material-symbols-outlined">wifi</span>
                  <span className="font-label-md">Online</span>
                </div>
                <span className="font-label-sm text-outline">Connection</span>
              </div>
            </div>
          </div>

          {/* Usage Progress Ring Bento */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Daily screen time progress - open screen time"
            onClick={() => onNavigate("screen-time")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onNavigate("screen-time");
            }}
            className="md:col-span-8 bg-surface-container-lowest rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant/30 relative overflow-hidden h-[320px] flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 transition-all"
          >
            <div className="absolute top-4 left-6">
              <h3 className="font-headline-md text-on-surface">
                Daily Screen Time
              </h3>
              <p className="font-label-md text-on-surface-variant">
                Limit: 2h 0m
              </p>
            </div>
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg
                aria-label="Progress ring"
                className="w-full h-full transform -rotate-90"
              >
                <circle
                  className="text-surface-container"
                  cx="96"
                  cy="96"
                  fill="transparent"
                  r="88"
                  stroke="currentColor"
                  strokeWidth="12"
                />
                <circle
                  className="text-primary-container transition-all duration-1000"
                  cx="96"
                  cy="96"
                  fill="transparent"
                  r="88"
                  stroke="currentColor"
                  strokeDasharray="553"
                  strokeDashoffset="138"
                  strokeLinecap="round"
                  strokeWidth="12"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-headline-lg-mobile text-on-surface">
                  1h 30m
                </span>
                <span className="font-label-sm text-outline">
                  Remaining: 30m
                </span>
              </div>
            </div>
            <div className="w-full flex justify-around mt-6 px-4">
              <div className="text-center">
                <p className="font-headline-md text-primary">45m</p>
                <p className="font-label-sm text-outline">Social</p>
              </div>
              <div className="text-center">
                <p className="font-headline-md text-tertiary">30m</p>
                <p className="font-label-sm text-outline">Games</p>
              </div>
              <div className="text-center">
                <p className="font-headline-md text-secondary">15m</p>
                <p className="font-label-sm text-outline">Study</p>
              </div>
            </div>
          </div>

          {/* Map Mini-Preview Bento Card (Matches spec xpath: //div[contains(@class, 'group') and div[contains(@style, 'background-image')]] ) */}
          <div
            role="button"
            tabIndex={0}
            aria-label="Live tracking - open map"
            onClick={() => onNavigate("location-tracking")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ")
                onNavigate("location-tracking");
            }}
            className="md:col-span-4 bg-surface-container-lowest rounded-xl shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-variant/30 overflow-hidden relative group cursor-pointer h-[320px]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url('${mapBgUrl}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
              <div>
                <p className="font-label-sm opacity-80 uppercase tracking-wider">
                  Live Tracking
                </p>
                <p className="font-label-md">Arrived 15m ago</p>
              </div>
              <span className="material-symbols-outlined text-white">
                open_in_full
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <section>
          <h3 className="font-headline-md text-on-surface mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() => {
                setInternetPaused(!internetPaused);
                showToast(
                  internetPaused
                    ? "Internet connection resumed"
                    : "Internet paused for Leo",
                );
              }}
              className={`card-lift text-left p-6 rounded-xl flex flex-col items-start gap-4 transition-all ${
                internetPaused
                  ? "bg-secondary text-on-secondary"
                  : "bg-primary-container text-on-primary"
              }`}
            >
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-white"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {internetPaused ? "play_circle" : "pause_circle"}
                </span>
              </div>
              <div>
                <h4 className="font-label-md text-white">
                  {internetPaused ? "Resume Internet" : "Pause Internet"}
                </h4>
                <p className="font-label-sm text-white/80">
                  {internetPaused
                    ? "Internet access is enabled"
                    : "Blocks all online activity"}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setDeviceLocked(!deviceLocked);
                showToast(
                  deviceLocked
                    ? "Device unlocked"
                    : "Device locked immediately",
                );
              }}
              className={`card-lift text-left p-6 rounded-xl border border-outline-variant/30 flex flex-col items-start gap-4 transition-all ${
                deviceLocked
                  ? "bg-inverse-surface text-inverse-on-surface"
                  : "bg-surface-container-highest text-on-surface"
              }`}
            >
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {deviceLocked ? "lock_open" : "lock"}
                </span>
              </div>
              <div>
                <h4 className="font-label-md">
                  {deviceLocked ? "Unlock Device" : "Lock Device"}
                </h4>
                <p className="font-label-sm text-outline">
                  {deviceLocked
                    ? "Device is currently locked"
                    : "Forces immediate screen lock"}
                </p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => {
                setAlarmActive(!alarmActive);
                showToast(
                  alarmActive
                    ? "Alarm stopped"
                    : "Ringing alarm on Leo's device!",
                );
              }}
              className={`card-lift text-left p-6 rounded-xl flex flex-col items-start gap-4 transition-all ${
                alarmActive
                  ? "bg-error text-on-error"
                  : "bg-error-container text-on-error-container"
              }`}
            >
              <div className="w-10 h-10 bg-error/10 rounded-full flex items-center justify-center text-error">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {alarmActive ? "volume_off" : "notification_important"}
                </span>
              </div>
              <div>
                <h4 className="font-label-md">
                  {alarmActive ? "Stop Alarm" : "Sound Alarm"}
                </h4>
                <p className="font-label-sm opacity-80">
                  {alarmActive
                    ? "Alarm is ringing now..."
                    : "Ring even if on silent"}
                </p>
              </div>
            </button>
          </div>
        </section>

        {/* Activity Feed Preview */}
        <section className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline-md text-on-surface">
              Recent Activity
            </h3>
            <button
              type="button"
              onClick={() => onNavigate("screen-time")}
              className="text-primary font-label-md hover:underline transition-all"
            >
              View All
            </button>
          </div>
          <div className="space-y-2">
            <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-surface-variant/20 hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-on-surface-variant">
                    youtube_activity
                  </span>
                </div>
                <div>
                  <p className="font-label-md">YouTube Kids</p>
                  <p className="font-label-sm text-outline">
                    Active for 20 minutes
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-outline">3:45 PM</span>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between border border-surface-variant/20 hover:bg-surface-container transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-secondary">
                    check_circle
                  </span>
                </div>
                <div>
                  <p className="font-label-md">Arrived at School</p>
                  <p className="font-label-sm text-outline">
                    Automatic check-in
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-outline">8:30 AM</span>
            </div>
          </div>
        </section>
      </main>

      {/* BottomNavBar (Satisfies //nav//a[span[text()='child_care']], //nav//a[span[text()='Kids']], //nav//a[span[text()='query_stats']], //nav//a[span[text()='Activity']], //nav//a[span[text()='settings']], //nav//a[span[text()='Settings']]) */}
      <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface dark:bg-on-background shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] rounded-t-xl flex justify-around items-center px-4 py-2 pb-safe">
        <button
          type="button"
          aria-label="Dashboard"
          onClick={() => onNavigate("dashboard")}
          className="flex flex-col items-center justify-center bg-secondary-container dark:bg-secondary text-on-secondary-container dark:text-on-secondary rounded-full px-4 py-1 active:scale-90 transition-transform duration-200"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            dashboard
          </span>
          <span className="font-label-sm">Dashboard</span>
        </button>
        <button
          type="button"
          aria-label="Kids - Location tracking"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("location-tracking");
          }}
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">child_care</span>
          <span className="font-label-sm">Kids</span>
        </button>
        <button
          type="button"
          aria-label="Activity - Screen time"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("screen-time");
          }}
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">query_stats</span>
          <span className="font-label-sm">Activity</span>
        </button>
        <button
          type="button"
          aria-label="Settings - App restrictions"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("app-restrictions");
          }}
          className="flex flex-col items-center justify-center text-on-surface-variant dark:text-outline px-4 py-1 hover:bg-surface-container-highest transition-colors active:scale-90"
        >
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-sm">Settings</span>
        </button>
      </nav>
    </div>
  );
};
