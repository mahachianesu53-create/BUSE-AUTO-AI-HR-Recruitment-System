"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send } from "lucide-react";

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  applicantName: string;
  applicantEmail: string;
  onSendEmail: (subject: string, message: string) => void;
}

export function EmailModal({
  isOpen,
  onClose,
  applicantName,
  applicantEmail,
  onSendEmail,
}: EmailModalProps) {
  const { toast } = useToast();
  const [subject, setSubject] = useState("Interview Invitation");
  const [message, setMessage] = useState(
    `Dear ${applicantName},\n\nCongratulations! We are pleased to invite you for an interview. Please check your email for further details.\n\nBest regards,\nHR Team`
  );
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Simulate sending email (demo only)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      onSendEmail(subject, message);

      toast({
        title: "Success",
        description: `Email sent to ${applicantEmail}`,
      });

      setSubject("Interview Invitation");
      setMessage(
        `Dear ${applicantName},\n\nCongratulations! We are pleased to invite you for an interview. Please check your email for further details.\n\nBest regards,\nHR Team`
      );
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send email",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Send Email to {applicantName}
          </DialogTitle>
          <DialogDescription>
            Email will be sent to: {applicantEmail}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <Input
              placeholder="Email subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Message
            </label>
            <Textarea
              placeholder="Email message"
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isLoading}
            />
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
            <strong>Note:</strong> This is a demo interface. In production, this would send a real email through your email service.
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSend}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>Loading...</>
            ) : (
              <>
                <Send className="h-4 w-4" />
                Send Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
