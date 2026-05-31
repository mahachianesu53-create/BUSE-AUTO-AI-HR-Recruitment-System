import { Metadata } from "next";
import HRDashboardPage from "./HRDashboardPageClient";

export const metadata: Metadata = {
  title: "HR Dashboard - Recruitment Portal",
  description: "Review and manage candidate applications with AI-powered evaluation",
};

export default function Page() {
  return <HRDashboardPage />;
}
