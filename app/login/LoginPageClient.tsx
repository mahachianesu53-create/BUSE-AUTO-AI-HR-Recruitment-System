"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Spinner } from "@/components/ui/spinner";
import { AlertCircle, Lock, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function LoginPageClient() {
  const router = useRouter();
  const { toast } = useToast();
  const [employeeNumber, setEmployeeNumber] = useState("EC1234567");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initSystem = async () => {
      try {
        const response = await fetch("/api/init");
        if (!response.ok) {
          console.error("[v0] Failed to initialize system");
        }
      } catch (err) {
        console.error("[v0] System initialization error:", err);
      }
    };

    initSystem();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employeeNumber: employeeNumber.trim(),
          password: password,
        }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.error || "Login failed";
        setError(errorMsg);
        toast({
          title: "Login Failed",
          description: errorMsg,
          variant: "destructive",
        });
        return;
      }

      if (data.token) {
        localStorage.setItem("auth_token", data.token);
      }

      toast({
        title: "Login Successful",
        description: "Redirecting to dashboard...",
      });

      router.push("/hr");
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "An error occurred during login";
      setError(errorMsg);
      toast({
        title: "Error",
        description: errorMsg,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Lock className="h-6 w-6" />
            HR Dashboard
          </CardTitle>
          <CardDescription>
            Login with your employee credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="employee-number" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Employee Number
              </Label>
              <Input
                id="employee-number"
                placeholder="EC1234567"
                value={employeeNumber}
                onChange={(e) => setEmployeeNumber(e.target.value)}
                disabled={isLoading}
                className="font-mono"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading || !employeeNumber || !password}
              className="w-full"
            >
              {isLoading ? (
                <>
                  <Spinner className="h-4 w-4 mr-2" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
