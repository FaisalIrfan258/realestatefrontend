"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { submitContactForm } from "@/lib/api";
import { showSuccessToast } from "@/components/ui/success-toast";
import { ConfirmationDialog } from "./confirmation-dialog";

const formSchema = z.object({
  propertyName: z.string().optional(),
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(5, { message: "Please enter a valid phone number" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof formSchema>;

interface ContactFormProps {
  propertyName?: string;
}

export default function ContactForm({ propertyName }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      propertyName: propertyName || "",
      name: "",
      phone: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    try {
      const response = await submitContactForm(values);
      
      if (response?.success) {
        // Store the name for the confirmation dialog
        setSubmittedName(values.name);
        
        // Show fancy success toast
        showSuccessToast({
          title: "Message sent successfully",
          description: "We'll get back to you as soon as possible.",
        });
        
        // Show the confirmation dialog
        setShowDialog(true);
        
        // Reset the form
        form.reset();
      } else {
        throw new Error("Form submission was not successful");
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {propertyName && (
            <FormField
              control={form.control}
              name="propertyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property</FormLabel>
                  <FormControl>
                    <Input {...field} disabled className="dark:bg-gray-800 dark:text-white dark:border-gray-700" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your name" {...field} className="dark:bg-gray-800 dark:text-white dark:border-gray-700" />
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
                  <Input placeholder="+92 318 2636767" {...field} className="dark:bg-gray-800 dark:text-white dark:border-gray-700" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Message</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="I'm interested in this property and would like more information..." 
                    rows={5}
                    {...field} 
                    className="dark:bg-gray-800 dark:text-white dark:border-gray-700"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>

      <ConfirmationDialog 
        open={showDialog}
        onClose={handleCloseDialog}
        name={submittedName}
      />
    </>
  );
}