"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { useToast } from "@/hooks/use-toast";
import { Upload, AlertCircle } from "lucide-react";

import { saveApplication } from "@/lib/applicationStorage";
import { Application } from "@/lib/types";

const applicationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 characters"),
  resumeFile: z.instanceof(File, { message: "Resume file is required" })
    .refine(
      (file) => file.size < 10 * 1024 * 1024,
      "Resume must be less than 10MB"
    )
    .refine(
      (file) =>
        file.type === "application/pdf" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.type === "application/msword",
      "Resume must be a PDF or Word document"
    ),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  onSuccess: (applicationId: string) => void;
  jobId: string;
}

export function ApplicationForm({ onSuccess, jobId }: ApplicationFormProps) {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    stage: string;
    isActive: boolean;
  } | null>(null);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      resumeFile: undefined,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("resumeFile", file);
    }
  };

  async function onSubmit(values: ApplicationFormValues) {
    try {
      setIsProcessing(true);

      // Extract text from document
      setUploadProgress({ stage: "Extracting resume content...", isActive: true });
      const extractFormData = new FormData();
      extractFormData.append('file', values.resumeFile);
      const extractResponse = await fetch('/api/extract-text', {
        method: 'POST',
        body: extractFormData,
      });
      if (!extractResponse.ok) {
        const error = await extractResponse.json();
        throw new Error(error.error || 'Failed to extract text from file');
      }
      const extractResult = await extractResponse.json();
      const extractedText = extractResult.text;

      // Evaluate with AI
      setUploadProgress({ stage: "Evaluating your qualifications...", isActive: true });
      const evaluateResponse = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeText: extractedText, jobId }),
      });
      if (!evaluateResponse.ok) {
        const error = await evaluateResponse.json();
        throw new Error(error.error || 'Failed to evaluate application');
      }
      const evaluateResult = await evaluateResponse.json();
      const evaluation = evaluateResult.evaluation;

      // Create application
      const application: Application = {
        id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        jobId,
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        resumeFileName: values.resumeFile.name,
        extractedText,
        evaluation,
        submittedAt: new Date().toISOString(),
        status: evaluation.decision === "ACCEPT" ? "ACCEPTED" : "REJECTED",
      };

      // Save to storage
      saveApplication({
        ...application,
        evaluation: {
          matchScore: evaluation.matchScore,
          decision: evaluation.decision,
          reasoning: evaluation.reasoning,
          keyStrengths: evaluation.keyStrengths,
          gaps: evaluation.gaps,
        },
      });

      toast({
        title: "Application submitted!",
        description: evaluation.decision === "ACCEPT"
          ? "Your application has been received. Please keep checking your emails for interview date."
          : "Your application has been received. Unfortunately, you do not qualify at this time.",
        variant: evaluation.decision === "ACCEPT" ? "default" : "destructive",
      });

      setUploadProgress(null);
      onSuccess(application.id);
    } catch (error) {
      console.error("[v0] Application submission error:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to process your application",
        variant: "destructive",
      });
      setUploadProgress(null);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Apply Now</CardTitle>
                        <CardDescription>
          Submit your resume for evaluation. Our AI will assess your qualifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {isProcessing && uploadProgress && (
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 flex items-center gap-3">
                <Spinner className="h-5 w-5" />
                <div>
                  <p className="font-medium text-blue-900">{uploadProgress.stage}</p>
                  <p className="text-sm text-blue-800">This may take a moment...</p>
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John Doe"
                      disabled={isProcessing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      disabled={isProcessing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      disabled={isProcessing}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="resumeFile"
              render={() => (
                <FormItem>
                  <FormLabel>Resume/CV</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        disabled={isProcessing}
                        className="sr-only"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                          <p className="text-sm font-medium text-gray-700">
                            {form.watch("resumeFile")?.name || "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PDF or Word document (max 10MB)
                          </p>
                        </div>
                      </label>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <Spinner className="mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
