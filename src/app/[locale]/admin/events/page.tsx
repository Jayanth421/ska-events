"use client";
import dynamic from "next/dynamic";
const EventsManager = dynamic(() => import("@/components/admin/EventsManager"), { ssr: false });
export default function AdminEventsRoute() { return <EventsManager />; }
