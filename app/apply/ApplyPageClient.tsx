"use client";

import { useState, useEffect } from "react";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ApplicationSuccess } from "@/components/ApplicationSuccess";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Job } from "@/lib/types";

export default function ApplyPage() {
  const [submittedApplicationId, setSubmittedApplicationId] = useState<
    string | null
  >(null);
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDeadlinePassed, setIsDeadlinePassed] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch('/api/jobs');
        const jobs = response.ok ? await response.json() : [];
        const activeJobs = jobs.filter((job: any) => new Date(job.applicationDeadline) > new Date());
        setActiveJobs(activeJobs);
        if (activeJobs.length > 0) {
          setSelectedJobId(activeJobs[0].id);
          setSelectedJob(activeJobs[0]);
          checkDeadline(activeJobs[0]);
        }
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        setActiveJobs([]);
      }
    };

    fetchJobs();
  }, []);

  const checkDeadline = (job: Job) => {
    const deadline = new Date(job.applicationDeadline);
    const now = new Date();
    setIsDeadlinePassed(now > deadline);
  };

  const handleJobChange = (jobId: string) => {
    const job = activeJobs.find(job => job.id === jobId);
    if (job) {
      setSelectedJobId(jobId);
      setSelectedJob(job);
      checkDeadline(job);
    }
  };

  const handleReset = () => {
    setSubmittedApplicationId(null);
  };

  if (activeJobs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-full max-w-lg">
          <div className="p-8 text-center">
            <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Active Jobs</h2>
            <p className="text-gray-600">There are currently no open positions. Please check back later.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12">
      <div className="container mx-auto px-4">
        {/* Job Selection */}
        {activeJobs.length > 1 && (
          <div className="mb-8 max-w-2xl mx-auto">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Position
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {activeJobs.map((job) => (
                <button
                  key={job.id}
                  onClick={() => handleJobChange(job.id)}
                  className={`p-3 rounded-lg border-2 transition text-left ${
                    selectedJobId === job.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="font-semibold text-gray-900">{job.title}</div>
                  <div className="text-sm text-gray-600">
                    Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Job Details Alert */}
        {selectedJob && (
          <div className="max-w-2xl mx-auto mb-8">
            <Alert className={isDeadlinePassed ? "bg-red-50 border-red-200" : "bg-blue-50 border-blue-200"}>
              <AlertCircle className={`h-4 w-4 ${isDeadlinePassed ? "text-red-600" : "text-blue-600"}`} />
              <AlertDescription>
                <div className="space-y-2">
                  <div className="font-semibold text-gray-900">{selectedJob.title}</div>
                  <div className="text-sm text-gray-700 mb-3">{selectedJob.description}</div>
                  
                  {/* Requirements */}
                  <div className="mb-3">
                    <div className="text-sm font-semibold text-gray-900 mb-1">Requirements:</div>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {selectedJob.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deadline Info */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-300">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">
                      Deadline: {new Date(selectedJob.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>

                  {isDeadlinePassed && (
                    <div className="text-sm font-semibold text-red-600 mt-2">
                      ⚠️ Application deadline has passed
                    </div>
                  )}
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Form or Success */}
        <div className="flex justify-center">
          {submittedApplicationId ? (
            <div className="w-full max-w-2xl">
              <ApplicationSuccess
                applicationId={submittedApplicationId}
                onReset={handleReset}
              />
            </div>
          ) : isDeadlinePassed ? (
            <Card className="w-full max-w-2xl">
              <div className="p-8 text-center">
                <Clock className="h-12 w-12 text-red-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Application Closed</h2>
                <p className="text-gray-600 mb-4">
                  Unfortunately, the application deadline for this position has passed.
                </p>
                <p className="text-sm text-gray-500">
                  Please check back for other opportunities.
                </p>
              </div>
            </Card>
          ) : selectedJob ? (
            <div className="w-full max-w-2xl">
              <ApplicationForm
                jobId={selectedJob.id}
                onSuccess={(id) => setSubmittedApplicationId(id)}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
