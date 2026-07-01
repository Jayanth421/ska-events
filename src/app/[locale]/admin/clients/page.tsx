"use client";
import dynamic from "next/dynamic";
const ClientsManager = dynamic(() => import("@/components/admin/ClientsManager"), { ssr: false });
export default function AdminClientsRoute() { return <ClientsManager />; }
