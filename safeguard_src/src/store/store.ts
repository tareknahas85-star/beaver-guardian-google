import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ChildStatus, AppLimit, SafeZone, LocationHistoryItem } from "../types";

export type ScreenType =
  | "dashboard"
  | "location-tracking"
  | "app-restrictions"
  | "screen-time"
  | "weekly-activity-report";

interface AppState {
  internetPaused: boolean;
  deviceLocked: boolean;
  alarmActive: boolean;
  currentScreen: ScreenType;
  childStatus: ChildStatus;
  appLimits: AppLimit[];
  safeZones: SafeZone[];
  locationHistory: LocationHistoryItem[];
  notifications: { id: string; message: string; time: string }[];
  setInternetPaused: (v: boolean) => void;
  setDeviceLocked: (v: boolean) => void;
  setAlarmActive: (v: boolean) => void;
  setCurrentScreen: (s: ScreenType) => void;
  addNotification: (msg: string) => void;
  updateAppLimit: (
    id: string,
    usedMinutes: number,
    isRestricted: boolean,
  ) => void;
  addLocationHistory: (item: LocationHistoryItem) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      internetPaused: false,
      deviceLocked: false,
      alarmActive: false,
      currentScreen: "dashboard",
      childStatus: {
        name: "Leo",
        avatar:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDWIsKNxnHOJ8Ww2wyO0NgeSvztSRrwCASMxNuw4QHRyJJngsatROAbWSZL6XDZp67iDp3wZNTblq3a0jurL733kSaMumpmDL9u_XmlgNdiPko5fSHiG2lDaWzgqHhZlKnhc5UVargta5eLggGTlje-lwXwIWAviRtKoqkFrVCjSI6TcBxy3wr4gFRnUKjrtAXTOXwB3DlU7k09uFFlLrYzFNOFQeAATheUZUQ2kbwOLIpBgLoKPTTP69rsLkNwjz_KzAN0t7aDgV_w",
        location: "Lincoln Middle School",
        safeZoneName: "Lincoln Middle School",
        isSafeZone: true,
        batteryLevel: 82,
        isConnected: true,
        lastUpdated: "2:15 PM",
      },
      appLimits: [
        {
          id: "yt",
          name: "YouTube Kids",
          category: "Social",
          iconName: "youtube_activity",
          bgColor: "#FEE2E2",
          textColor: "#991B1B",
          usedMinutes: 45,
          limitMinutes: 60,
          isRestricted: false,
        },
        {
          id: "mc",
          name: "Minecraft",
          category: "Games",
          iconName: "sports_esports",
          bgColor: "#DBEAFE",
          textColor: "#1E3A8A",
          usedMinutes: 30,
          limitMinutes: 45,
          isRestricted: false,
        },
        {
          id: "study",
          name: "Khan Academy",
          category: "Study",
          iconName: "school",
          bgColor: "#D1FAE5",
          textColor: "#065F46",
          usedMinutes: 15,
          limitMinutes: 0,
          isRestricted: false,
        },
      ],
      safeZones: [
        {
          id: "s1",
          name: "Lincoln Middle School",
          alerts: "5 alerts today",
          icon: "school",
          bgColor: "#3525cd",
          textColor: "#ffffff",
          enabled: true,
        },
        {
          id: "s2",
          name: "Home",
          alerts: "0 alerts",
          icon: "home",
          bgColor: "#006c49",
          textColor: "#ffffff",
          enabled: true,
        },
      ],
      locationHistory: [
        {
          id: "l1",
          time: "8:30 AM",
          title: "Arrived at School",
          subtitle: "Automatic check-in",
          isPast: true,
        },
        {
          id: "l2",
          time: "3:45 PM",
          title: "YouTube Kids",
          subtitle: "Active for 20 minutes",
          isPast: false,
        },
      ],
      notifications: [
        {
          id: "n1",
          message: "Leo arrived at school safely",
          time: "8 mins ago",
        },
        {
          id: "n2",
          message: "Screen time limit reached for YouTube",
          time: "1 hr ago",
        },
      ],
      setInternetPaused: (v) => set({ internetPaused: v }),
      setDeviceLocked: (v) => set({ deviceLocked: v }),
      setAlarmActive: (v) => set({ alarmActive: v }),
      setCurrentScreen: (s) => set({ currentScreen: s }),
      addNotification: (msg) =>
        set((state) => ({
          notifications: [
            { id: Date.now().toString(), message: msg, time: "Just now" },
            ...state.notifications.slice(0, 4),
          ],
        })),
      updateAppLimit: (id, usedMinutes, isRestricted) =>
        set((state) => ({
          appLimits: state.appLimits.map((app) =>
            app.id === id ? { ...app, usedMinutes, isRestricted } : app,
          ),
        })),
      addLocationHistory: (item) =>
        set((state) => ({ locationHistory: [item, ...state.locationHistory] })),
    }),
    {
      name: "safeguard-store",
      partialize: (state) => ({
        currentScreen: state.currentScreen,
        internetPaused: state.internetPaused,
        deviceLocked: state.deviceLocked,
        alarmActive: state.alarmActive,
        appLimits: state.appLimits,
        notifications: state.notifications,
      }),
    },
  ),
);
