import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Dashboard } from "./components/Dashboard";
import { LocationTracking } from "./components/LocationTracking";
import { AppRestrictions } from "./components/AppRestrictions";
import { ScreenTime } from "./components/ScreenTime";
import { WeeklyActivityReport } from "./components/WeeklyActivityReport";
import type { Screen } from "./types";

function DashboardWrapper() {
        const navigate = useNavigate();
        return (
                <Dashboard
                        onNavigate={(s: Screen) =>
                                navigate(
                                        `/${s === "dashboard" ? "" : s.replace("location-tracking", "location").replace("app-restrictions", "restrictions").replace("screen-time", "screen-time").replace("weekly-activity-report", "weekly")}`,
                                )
                        }
                />
        );
}
function LocationWrapper() {
        const navigate = useNavigate();
        return (
                <LocationTracking
                        onNavigate={(s: Screen) =>
                                navigate(
                                        `/${s === "dashboard" ? "" : s.replace("location-tracking", "location").replace("app-restrictions", "restrictions").replace("screen-time", "screen-time").replace("weekly-activity-report", "weekly")}`,
                                )
                        }
                />
        );
}
function RestrictionsWrapper() {
        const navigate = useNavigate();
        return (
                <AppRestrictions
                        onNavigate={(s: Screen) =>
                                navigate(
                                        `/${s === "dashboard" ? "" : s.replace("location-tracking", "location").replace("app-restrictions", "restrictions").replace("screen-time", "screen-time").replace("weekly-activity-report", "weekly")}`,
                                )
                        }
                />
        );
}
function ScreenTimeWrapper() {
        const navigate = useNavigate();
        return (
                <ScreenTime
                        onNavigate={(s: Screen) =>
                                navigate(
                                        `/${s === "dashboard" ? "" : s.replace("location-tracking", "location").replace("app-restrictions", "restrictions").replace("screen-time", "screen-time").replace("weekly-activity-report", "weekly")}`,
                                )
                        }
                />
        );
}
function WeeklyWrapper() {
        const navigate = useNavigate();
        return (
                <WeeklyActivityReport
                        onNavigate={(s: Screen) =>
                                navigate(
                                        `/${s === "dashboard" ? "" : s.replace("location-tracking", "location").replace("app-restrictions", "restrictions").replace("screen-time", "screen-time").replace("weekly-activity-report", "weekly")}`,
                                )
                        }
                />
        );
}

export default function App() {
        return (
                <ErrorBoundary>
                        <BrowserRouter>
                                <Routes>
                                        <Route
                                                path="/"
                                                element={<DashboardWrapper />}
                                        />
                                        <Route
                                                path="/location"
                                                element={<LocationWrapper />}
                                        />
                                        <Route
                                                path="/restrictions"
                                                element={
                                                        <RestrictionsWrapper />
                                                }
                                        />
                                        <Route
                                                path="/screen-time"
                                                element={<ScreenTimeWrapper />}
                                        />
                                        <Route
                                                path="/weekly"
                                                element={<WeeklyWrapper />}
                                        />
                                </Routes>
                        </BrowserRouter>
                </ErrorBoundary>
        );
}
