"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Briefcase, Users } from "lucide-react";
import Link from "next/link";

export function MainPageClient() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize system and check if user is authenticated
    const checkAuth = async () => {
      try {
        // Initialize default user
        await fetch("/api/init");
        
        // Check if user is authenticated
        const response = await fetch("/api/auth/user");
        setIsAuthenticated(response.ok);
      } catch {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Clicking the HR button should always take the user to the login page.
  // The dashboard itself will be accessible after a successful login.
  const handleHRDashboard = () => {
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-purple-600 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-600 via-blue-500 to-purple-600">
      <div className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center text-white mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            BUSE Auto AI Recruiter
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Streamline your hiring process with intelligent candidate evaluation powered by advanced AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Applicant Card */}
          <Card className="backdrop-blur-sm bg-white/95">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>For Applicants</CardTitle>
              </div>
              <CardDescription>
                Submit your application and get instant AI-powered evaluation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Easy application process
                </li>
                 <li className="flex items-center gap-2">
                   <span className="text-green-600">✓</span>
                   Upload resume (PDF or Word)
                 </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Instant AI evaluation
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Match score and feedback
                </li>
              </ul>
              <Link href="/apply" className="block">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 gap-2">
                  Start Application
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* HR Card */}
          <Card className="backdrop-blur-sm bg-white/95">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>For HR Teams</CardTitle>
              </div>
              <CardDescription>
                Review shortlisted candidates with detailed AI evaluations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  View all applications
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Filter by status
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  View match scores
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Send emails to candidates
                </li>
              </ul>
              <Button
                onClick={handleHRDashboard}
                className="w-full bg-purple-600 hover:bg-purple-700 gap-2"
              >
                {isAuthenticated ? "Go to Dashboard" : "HR Login"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
