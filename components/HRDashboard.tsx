"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Users, TrendingUp, Briefcase, X } from "lucide-react";
import { getAllApplications, getApplicationsByStatus } from "@/lib/applicationStorage";
import { Application, Job } from "@/lib/types";
import { JobManagement } from "@/components/JobManagement";
import { useToast } from "@/hooks/use-toast";

interface HRDashboardProps {
  onSelectApplication: (applicationId: string) => void;
}

export function HRDashboard({ onSelectApplication }: HRDashboardProps) {
  const [allApplications, setAllApplications] = useState<Application[]>([]);
  const [acceptedApplications, setAcceptedApplications] = useState<Application[]>([]);
  const [rejectedApplications, setRejectedApplications] = useState<Application[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showJobSuccess, setShowJobSuccess] = useState(false);

  // Change password states (only available inside dashboard)
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

  // Load applications and jobs on component mount
  const loadData = async () => {
    const all = getAllApplications();
    const accepted = getApplicationsByStatus("ACCEPTED");
    const rejected = getApplicationsByStatus("REJECTED");

    try {
      const jobsResponse = await fetch('/api/jobs');
      const rawJobs = jobsResponse.ok ? await jobsResponse.json() : [];
      // Convert DB snake_case fields to the camelCase shape expected by the UI
      const normalizedJobs = rawJobs.map((job: any) => ({
        ...job,
        isActive: Boolean(job.isActive),
        // Ensure requirements is an array
        requirements: typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements,
      }));

      setAllApplications(all);
      setAcceptedApplications(accepted);
      setRejectedApplications(rejected);
      setJobs(normalizedJobs);
    } catch (error) {
      console.error('Failed to load jobs:', error);
      setAllApplications(all);
      setAcceptedApplications(accepted);
      setRejectedApplications(rejected);
      setJobs([]);
    }
  };

  // Refresh only the jobs list (used after a new job is added)
  const refreshJobs = async () => {
    try {
      const jobsResponse = await fetch('/api/jobs');
      const rawJobs = jobsResponse.ok ? await jobsResponse.json() : [];
      const normalizedJobs = rawJobs.map((job: any) => ({
        ...job,
        isActive: Boolean(job.isActive),
        requirements: typeof job.requirements === 'string' ? JSON.parse(job.requirements) : job.requirements,
      }));
      setJobs(normalizedJobs);
      // Show success banner
      setShowJobSuccess(true);
      setTimeout(() => setShowJobSuccess(false), 5000);
    } catch (error) {
      console.error('Failed to refresh jobs:', error);
    }
  };

  // Handler passed to JobManagement when a job is added
  const handleJobAdded = () => {
    refreshJobs();
  };

  useEffect(() => {
    loadData();
  }, []);

  // Logout handler – clears auth cookie/session and redirects to landing page
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      // Remove any client‑side token storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
      }
      router.push('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Change password handler - only accessible from inside the authenticated dashboard
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "New password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to change password');
      }

      toast({
        title: "Success",
        description: data.message || "Password changed successfully",
      });

      // Reset form and hide
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setShowChangePassword(false);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to change password";
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const avgMatchScore =
    allApplications.length > 0
      ? Math.round(
          allApplications.reduce(
            (sum, app) => sum + app.evaluation.matchScore,
            0
          ) / allApplications.length
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Success message banner */}
      {showJobSuccess && (
        <div className="rounded-md bg-green-50 p-4 border border-green-200">
          <p className="text-sm font-medium text-green-800">Job posting created successfully.</p>
        </div>
      )}
      {/* Job Management Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Job Positions
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowChangePassword(!showChangePassword)}
              >
                Change Password
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardTitle>
          <CardDescription>
            Manage job openings and set application deadlines
          </CardDescription>
        </CardHeader>
        <CardContent>
          <JobManagement onJobAdded={handleJobAdded} />

          {/* Change Password Section - Only available inside the HR dashboard */}
          {showChangePassword && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50">
              <h4 className="font-semibold text-sm text-gray-900 mb-3">Change Your Password</h4>
              <form onSubmit={handleChangePassword} className="space-y-3 max-w-md">
                <div>
                  <Label htmlFor="current-password" className="text-xs">Current Password</Label>
                  <Input
                    id="current-password"
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    disabled={isChangingPassword}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="new-password" className="text-xs">New Password</Label>
                  <Input
                    id="new-password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={isChangingPassword}
                    required
                    minLength={6}
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-new-password" className="text-xs">Confirm New Password</Label>
                  <Input
                    id="confirm-new-password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    disabled={isChangingPassword}
                    required
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button type="submit" size="sm" disabled={isChangingPassword}>
                    {isChangingPassword ? "Changing..." : "Update Password"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowChangePassword(false);
                      setCurrentPassword("");
                      setNewPassword("");
                      setConfirmNewPassword("");
                    }}
                    disabled={isChangingPassword}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="mt-6 pt-6 border-t">
            <h4 className="font-semibold text-sm text-gray-900 mb-3">Active Jobs</h4>
            <div className="space-y-2">
              {jobs.filter(j => j.isActive).map((job) => (
                <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{job.title}</p>
                    <p className="text-xs text-gray-600">
                      Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Active</Badge>
                    <button
                      type="button"
                      onClick={async (e) => {
                        e.stopPropagation();
                         if (confirm('Delete job "' + job.title + '"? This cannot be undone.')) {
                           try {
                             const delResp = await fetch(`/api/jobs/${job.id}`, {
                               method: 'DELETE',
                               credentials: 'include',
                             });
                             if (delResp.ok) {
                               const data = await delResp.json().catch(() => ({}));
                               toast({
                                 title: "Success",
                                 description: data.message || "job deleted succsesfully",
                               });
                               await loadData();
                             } else {
                               const err = await delResp.json();
                               alert('Delete failed: ' + (err.error || delResp.statusText));
                             }
                           } catch (err) {
                             console.error(err);
                             alert('Delete request error');
                           }
                         }
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{allApplications.length}</div>
              <Users className="h-8 w-8 text-blue-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Accepted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-green-600">
                {acceptedApplications.length}
              </div>
              <CheckCircle className="h-8 w-8 text-green-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-red-600">
                {rejectedApplications.length}
              </div>
              <XCircle className="h-8 w-8 text-red-500 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Avg Match Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">{avgMatchScore}%</div>
              <TrendingUp className="h-8 w-8 text-purple-500 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            Review and manage all candidate applications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">
                All ({allApplications.length})
              </TabsTrigger>
              <TabsTrigger value="accepted">
                Accepted ({acceptedApplications.length})
              </TabsTrigger>
              <TabsTrigger value="rejected">
                Rejected ({rejectedApplications.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-3">
              {allApplications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No applications yet. Share the application link with candidates.
                </div>
              ) : (
                allApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onSelect={() => onSelectApplication(app.id)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="accepted" className="space-y-3">
              {acceptedApplications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No accepted applications yet.
                </div>
              ) : (
                acceptedApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onSelect={() => onSelectApplication(app.id)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="rejected" className="space-y-3">
              {rejectedApplications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No rejected applications.
                </div>
              ) : (
                rejectedApplications.map((app) => (
                  <ApplicationCard
                    key={app.id}
                    application={app}
                    onSelect={() => onSelectApplication(app.id)}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

function ApplicationCard({
  application,
  onSelect,
}: {
  application: Application;
  onSelect: () => void;
}) {
  return (
    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors" onClick={onSelect}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-gray-900">{application.fullName}</h3>
            <Badge
              variant={
                application.status === "ACCEPTED" ? "default" : "secondary"
              }
            >
              {application.status === "ACCEPTED" ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <XCircle className="h-3 w-3 mr-1" />
              )}
              {application.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-600">{application.email}</p>
          <p className="text-sm text-gray-600">{application.phone}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-600">Match Score</p>
            <p className="text-2xl font-bold">{application.evaluation.matchScore}%</p>
          </div>
          <Button variant="outline" size="sm" onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
