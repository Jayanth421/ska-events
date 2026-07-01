"use client";
import dynamic from "next/dynamic";
const BookingsManager = dynamic(() => import("@/components/admin/BookingsManager"), { ssr: false });
export default function AdminBookingsRoute() { return <BookingsManager />; }
