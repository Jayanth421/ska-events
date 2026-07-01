"use client";

import dynamic from "next/dynamic";

const PlanningManager = dynamic(
  () => import("@/components/admin/PlanningManager"),
  { ssr: false }
);

export default function AdminPlanningPage() {
  return <PlanningManager />;
}
