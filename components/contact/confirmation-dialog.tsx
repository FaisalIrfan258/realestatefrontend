"use client";

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle2, Mail, Phone, PartyPopper, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  name: string;
}

export function ConfirmationDialog({ open, onClose, name }: ConfirmationDialogProps) {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    if (open) {
      // Trigger animation after dialog opens
      const timer = setTimeout(() => {
        setAnimate(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setAnimate(false);
    }
  }, [open]);
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md overflow-hidden">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br from-green-100 to-transparent opacity-0 transition-opacity duration-1000",
          animate && "opacity-100"
        )} />
        <DialogHeader>
          <div className="flex flex-col items-center justify-center pb-4 relative">
            <div className={cn(
              "rounded-full bg-green-100 p-3 mb-4 transition-all duration-700 transform scale-0",
              animate && "scale-100"
            )}>
              <CheckCircle2 className="h-10 w-10 text-green-600 animate-pulse" />
            </div>
            <div className="absolute top-0 left-0 right-0 flex justify-between opacity-0 transition-opacity duration-1000 delay-500" style={{ opacity: animate ? 0.7 : 0 }}>
              <PartyPopper className="h-5 w-5 text-yellow-500 animate-bounce" />
              <ThumbsUp className="h-5 w-5 text-blue-500 animate-bounce" />
              <PartyPopper className="h-5 w-5 text-yellow-500 animate-bounce" />
            </div>
            <DialogTitle className={cn(
              "text-2xl font-bold text-center transition-all duration-500 transform translate-y-4 opacity-0",
              animate && "translate-y-0 opacity-100"
            )}>Thank You!</DialogTitle>
          </div>
          <DialogDescription className={cn(
            "text-center px-4 transition-all duration-500 delay-300 transform translate-y-4 opacity-0",
            animate && "translate-y-0 opacity-100"
          )}>
            <p className="mb-3">
              Hi <span className="font-semibold">{name}</span>, your message has been sent successfully! Our team will get back to you as soon as possible.
            </p>
            <div className="mt-6 grid gap-4">
              <div className={cn(
                "flex items-center justify-center gap-2 text-muted-foreground transition-all duration-500 delay-400 transform translate-y-4 opacity-0",
                animate && "translate-y-0 opacity-100"
              )}>
                <Phone className="h-4 w-4" />
                <span>We'll call you within 24 hours</span>
              </div>
              <div className={cn(
                "flex items-center justify-center gap-2 text-muted-foreground transition-all duration-500 delay-500 transform translate-y-4 opacity-0",
                animate && "translate-y-0 opacity-100"
              )}>
                <Mail className="h-4 w-4" />
                <span>Check your email for confirmation</span>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className={cn(
          "flex justify-center mt-4 transition-all duration-500 delay-600 transform translate-y-4 opacity-0",
          animate && "translate-y-0 opacity-100"
        )}>
          <Button onClick={onClose} className="px-8 bg-green-600 hover:bg-green-700">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 