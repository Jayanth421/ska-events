"use client";
import dynamic from "next/dynamic";
const VendorsManager = dynamic(() => import("@/components/admin/VendorsManager"), { ssr: false });
export default function AdminVendorsRoute() { return <VendorsManager />; }
