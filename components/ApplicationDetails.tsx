"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle, ArrowLeft, Download, Mail } from "lucide-react";
import { getApplicationById, updateApplicationEmail } from "@/lib/applicationStorage";
import { Application } from "@/lib/types";
import { JOB_REQUIREMENTS } from "@/lib/jobRequirements";
import { EmailModal } from "@/components/EmailModal";

interface ApplicationDetailsProps {
  applicationId: string;
  onBack: () => void;
}

export function ApplicationDetails({
  applicationId,
  onBack,
}: ApplicationDetailsProps) {
  const [application, setApplication] = useState<Application | null>(null);
  const [showFullResume, setShowFullResume] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  useEffect(() => {
    const app = getApplicationById(applicationId);
    setApplication(app);
  }, [applicationId]);

  const handleSendEmail = (subject: string, message: string) => {
    if (application) {
      const updated = updateApplicationEmail(application.id, true);
      if (updated) {
        setApplication(updated);
      }
    }
  };

  if (!application) {
    return null;
  }

  const isAccepted = application.status === "ACCEPTED";
  const submittedDate = new Date(application.submittedAt).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <>
      <div className="space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="gap-2 -ml-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </Button>

        {/* Header */}
        <Card
          className={
            isAccepted
              ? "border-green-200 bg-green-50"
              : "border-red-200 bg-red-50"
          }
        >
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CardTitle className={isAccepted ? "text-green-900" : "text-red-900"}>
                    {application.fullName}
                  </CardTitle>
                  <Badge
                    variant={isAccepted ? "default" : "secondary"}
                  >
                    {isAccepted ? (
                      <CheckCircle className="h-3 w-3 mr-1" />
                    ) : (
                      <XCircle className="h-3 w-3 mr-1" />
                    )}
                    {application.status}
                  </Badge>
                  {application.emailSent && (
                    <Badge variant="outline" className="bg-blue-50">
                      <Mail className="h-3 w-3 mr-1" />
                      Email Sent
                    </Badge>
                  )}
                </div>
                <CardDescription className={isAccepted ? "text-green-700" : "text-red-700"}>
                  Submitted on {submittedDate}
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Match Score</p>
                  <p className="text-4xl font-bold">
                    {application.evaluation.matchScore}%
                  </p>
                </div>
                {isAccepted && !application.emailSent && (
                  <Button
                    onClick={() => setShowEmailModal(true)}
                    className="gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    Send Email
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-gray-900">{application.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Phone</p>
              <p className="text-gray-900">{application.phone}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Resume</p>
              <p className="text-gray-900">{application.resumeFileName}</p>
            </div>
          </CardContent>
        </Card>

        {/* Evaluation */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Evaluation</CardTitle>
            <CardDescription>Detailed assessment by AI recruiter</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Evaluation Notes</p>
              <p className="text-gray-700 p-3 bg-gray-50 rounded text-sm leading-relaxed">
                {application.evaluation.reasoning}
              </p>
            </div>

            {application.evaluation.keyStrengths.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Key Strengths ({application.evaluation.keyStrengths.length})
                </p>
                <ul className="space-y-2">
                  {application.evaluation.keyStrengths.map((strength, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 flex items-start gap-2 p-2 bg-green-50 rounded"
                    >
                      <span className="text-green-600 font-bold mt-0.5">✓</span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {application.evaluation.gaps.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Areas for Development ({application.evaluation.gaps.length})
                </p>
                <ul className="space-y-2">
                  {application.evaluation.gaps.map((gap, i) => (
                    <li
                      key={i}
                      className="text-sm text-gray-700 flex items-start gap-2 p-2 bg-orange-50 rounded"
                    >
                      <span className="text-orange-600 font-bold mt-0.5">•</span>
                      <span>{gap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Job Requirements Matching */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Position Requirements</CardTitle>
            <CardDescription>{JOB_REQUIREMENTS.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Required Skills</p>
              <div className="flex flex-wrap gap-2">
                {JOB_REQUIREMENTS.requiredSkills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Required Experience</p>
              <p className="text-gray-900">{JOB_REQUIREMENTS.requiredExperience}</p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Required Education</p>
              <p className="text-gray-900">{JOB_REQUIREMENTS.requiredEducation}</p>
            </div>

            <Separator />

            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Nice to Have</p>
              <div className="flex flex-wrap gap-2">
                {JOB_REQUIREMENTS.niceToHave.map((item) => (
                  <Badge key={item} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Extracted Resume Text */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Extracted Resume Text</CardTitle>
            <CardDescription>Raw text extracted from the uploaded document</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFullResume(true)}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              View Full Resume
            </Button>
            <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 max-h-64 overflow-y-auto border">
              <p className="whitespace-pre-wrap text-xs">
                {application.extractedText.substring(0, 500)}...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full Resume Dialog */}
      <Dialog open={showFullResume} onOpenChange={setShowFullResume}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Full Resume Text</DialogTitle>
            <DialogDescription>
              Complete extracted text from {application.resumeFileName}
            </DialogDescription>
          </DialogHeader>
          <div className="bg-gray-50 p-4 rounded text-sm text-gray-700 border">
            <p className="whitespace-pre-wrap">{application.extractedText}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Email Modal */}
      <EmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        applicantName={application.fullName}
        applicantEmail={application.email}
        onSendEmail={handleSendEmail}
      />
    </>
  );
}
