"use client";

import { useState } from "react";
import { HRDashboard } from "@/components/HRDashboard";
import { ApplicationDetails } from "@/components/ApplicationDetails";

export default function HRDashboardPage() {
  const [selectedApplicationId, setSelectedApplicationId] = useState<
    string | null
  >(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              HR Dashboard
            </h1>
            <p className="text-lg text-gray-600">
              Review and manage candidate applications
            </p>
          </div>

          {/* Content */}
          {selectedApplicationId ? (
            <ApplicationDetails
              applicationId={selectedApplicationId}
              onBack={() => setSelectedApplicationId(null)}
            />
          ) : (
            <HRDashboard
              onSelectApplication={(id) => setSelectedApplicationId(id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
