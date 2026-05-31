"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
import { getApplicationById } from "@/lib/applicationStorage";
import { Application } from "@/lib/types";

interface ApplicationSuccessProps {
  applicationId: string;
  onReset: () => void;
}

export function ApplicationSuccess({
  applicationId,
  onReset,
}: ApplicationSuccessProps) {
  const [application, setApplication] = useState<Application | null>(null);

  useEffect(() => {
    const app = getApplicationById(applicationId);
    setApplication(app);
  }, [applicationId]);

  if (!application) {
    return null;
  }

  const isAccepted = application.status === "ACCEPTED";

  return (
    <div className="space-y-4">
      <Card
        className={
          isAccepted
            ? "border-green-200 bg-green-50"
            : "border-red-200 bg-red-50"
        }
      >
        <CardHeader>
          <div className="flex items-start gap-4">
            {isAccepted ? (
              <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0" />
            )}
            <div>
              <CardTitle
                className={isAccepted ? "text-green-900" : "text-red-900"}
              >
                {isAccepted
                  ? "Congratulations!"
                  : "Thank You for Your Application"}
              </CardTitle>
              <CardDescription
                className={isAccepted ? "text-green-700" : "text-red-700"}
              >
                {isAccepted
                  ? "Your profile matches our requirements. Please keep checking your emails for interview details!"
                  : "Your application does not meet our current requirements."}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Evaluation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Match Score</p>
            <div className="mt-2 flex items-center gap-3">
              <div className="flex-grow bg-gray-200 rounded-full h-2">
                <div
                  className={`h-full rounded-full transition-all ${
                    isAccepted ? "bg-green-500" : "bg-red-500"
                  }`}
                  style={{
                    width: `${application.evaluation.matchScore}%`,
                  }}
                />
              </div>
              <span className="text-lg font-bold">
                {application.evaluation.matchScore}%
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Evaluation Notes</p>
            <p className="text-sm text-gray-700 p-3 bg-gray-50 rounded">
              {application.evaluation.reasoning}
            </p>
          </div>

          {application.evaluation.keyStrengths.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Key Strengths
              </p>
              <ul className="space-y-1">
                {application.evaluation.keyStrengths.map((strength, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <span className="text-green-600">✓</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {application.evaluation.gaps.length > 0 && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">
                Areas for Development
              </p>
              <ul className="space-y-1">
                {application.evaluation.gaps.map((gap, i) => (
                  <li
                    key={i}
                    className="text-sm text-gray-700 flex items-center gap-2"
                  >
                    <span className="text-orange-600">•</span>
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      <Button onClick={onReset} variant="outline" className="w-full">
        Submit Another Application
      </Button>
    </div>
  );
}
