'use client';

import React from 'react';
import { CheckCircle2, PartyPopper } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Toast, ToastDescription, ToastTitle, ToastActionElement } from './toast';
import { useToast } from '@/hooks/use-toast';

interface SuccessToastProps {
  title: string;
  description: string;
  action?: ToastActionElement;
}

export function showSuccessToast({ title, description, action }: SuccessToastProps) {
  const { toast } = useToast();
  
  toast({
    variant: "success",
    title: (
      <div className="flex items-center gap-2">
        <div className="relative">
          <CheckCircle2 className="h-5 w-5 animate-bounce" />
          <PartyPopper className="h-3 w-3 absolute -top-1 -right-1 text-yellow-300" />
        </div>
        <span className="animate-pulse">{title}</span>
      </div>
    ) as any, // Cast to any to fix type issues
    description: description,
    action: action,
    className: "border-l-4 border-l-green-600 shadow-lg shadow-green-500/20 transition-all duration-500 animate-in fade-in-0 zoom-in-95",
    duration: 5000, // Show for 5 seconds
  });
} 