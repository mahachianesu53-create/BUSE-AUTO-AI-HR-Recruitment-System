"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, X } from "lucide-react";
import { getAllJobs } from "@/lib/applicationStorage";
import { Job } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

const jobSchema = z.object({
  title: z.string().min(3, "Job title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  // requirements are handled as an array of strings via UI, so we make this field optional
  requirements: z.string().optional(),
  applicationDeadline: z.string().min(1, "Application deadline is required"),
});

type JobFormValues = z.infer<typeof jobSchema>;

interface JobManagementProps {
  onJobAdded?: () => void;
}

export function JobManagement({ onJobAdded }: JobManagementProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [requirementInput, setRequirementInput] = useState("");

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      requirements: "",
      applicationDeadline: "",
    },
  });

  const addRequirement = () => {
    if (requirementInput.trim()) {
      setRequirements([...requirements, requirementInput.trim()]);
      setRequirementInput("");
    }
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  async function onSubmit(values: JobFormValues) {
    if (requirements.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one requirement",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch('/api/jobs', { credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          requirements: JSON.stringify(requirements),
          applicationDeadline: values.applicationDeadline,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "Success",
          description: `Job "${values.title}" has been created`,
        });

        form.reset();
        setRequirements([]);
        setIsOpen(false);
        onJobAdded?.();
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create job');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create job",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-4">
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add New Job Position
        </Button>
      )}

      {isOpen && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Create New Job Position</CardTitle>
                <CardDescription>
                  Add a new job opening to the system
                </CardDescription>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Senior Software Engineer"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe the job role and responsibilities..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel>Requirements</FormLabel>
                  <div className="space-y-3 mt-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., 5+ years of JavaScript experience"
                        value={requirementInput}
                        onChange={(e) => setRequirementInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addRequirement();
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={addRequirement}
                      >
                        Add
                      </Button>
                    </div>

                    {requirements.length > 0 && (
                      <div className="space-y-2">
                        {requirements.map((req, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                          >
                            <span className="text-sm text-gray-700">{req}</span>
                            <button
                              type="button"
                              onClick={() => removeRequirement(idx)}
                              className="text-gray-400 hover:text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <FormDescription className="mt-2">
                    {requirements.length} requirement(s) added
                  </FormDescription>
                </div>

                <FormField
                  control={form.control}
                  name="applicationDeadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Application Deadline</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} />
                      </FormControl>
                      <FormDescription>
                        Applications will be closed after this date and time
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    type="submit"
                    className="flex-1"
                  >
                    Create Job Position
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setIsOpen(false);
                      form.reset();
                      setRequirements([]);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
