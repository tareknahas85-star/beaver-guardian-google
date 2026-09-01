export type Screen = 
  | 'dashboard'
  | 'location-tracking'
  | 'app-restrictions'
  | 'screen-time'
  | 'weekly-activity-report';

export interface ChildStatus {
  name: string;
  avatar: string;
  location: string;
  safeZoneName: string;
  isSafeZone: boolean;
  batteryLevel: number;
  isConnected: boolean;
  lastUpdated: string;
}

export interface AppLimit {
  id: string;
  name: string;
  category: string;
  iconName: string;
  bgColor: string;
  textColor: string;
  usedMinutes: number;
  limitMinutes: number; // 0 for unlimited
  isRestricted: boolean;
  iconUrl?: string;
}

export interface LocationHistoryItem {
  id: string;
  time: string;
  title: string;
  subtitle: string;
  isPast?: boolean;
}

export interface SafeZone {
  id: string;
  name: string;
  alerts: string;
  icon: string;
  bgColor: string;
  textColor: string;
  enabled: boolean;
}
