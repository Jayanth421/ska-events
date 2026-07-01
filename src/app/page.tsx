import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect root to /en by default; middleware will handle locale detection
  redirect("/en");
}
