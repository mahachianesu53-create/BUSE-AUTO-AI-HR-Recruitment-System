import { Metadata } from "next";
import ApplyPage from "./ApplyPageClient";

export const metadata: Metadata = {
  title: "Apply - HR Recruitment",
  description: "Submit your application for the Senior Software Engineer position",
};

export default function Page() {
  return <ApplyPage />;
}
