"use client";
import dynamic from "next/dynamic";
const SettingsManager = dynamic(() => import("@/components/admin/SettingsManager"), { ssr: false });
export default function AdminSettingsRoute() { return <SettingsManager />; }
