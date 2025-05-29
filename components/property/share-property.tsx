"use client";

import { useState } from "react";
import { Share2, Facebook, Mail, Copy, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Property } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

interface SharePropertyProps {
  property: Property;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  showText?: boolean;
}

export default function ShareProperty({ 
  property, 
  variant = "outline", 
  size = "sm", 
  showText = true 
}: SharePropertyProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Handle property URL generation safely for both client and server
  const getPropertyUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/properties/${property._id}`;
    }
    return `/properties/${property._id}`;
  };
  
  const shareTitle = `Check out this property: ${property.title}`;
  const shareText = `${property.bedrooms} bed, ${property.bathrooms} bath property in ${property.location} for ${property.price}`;
  
  const shareLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      url: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getPropertyUrl())}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="h-5 w-5" />,
      url: () => `https://api.whatsapp.com/send?text=${encodeURIComponent(shareTitle + " " + getPropertyUrl())}`,
    },
    {
      name: "Email",
      icon: <Mail className="h-5 w-5" />,
      url: () => `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(shareText + "\n\n" + getPropertyUrl())}`,
    },
  ];
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getPropertyUrl());
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Property link has been copied to clipboard",
        variant: "success",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to clipboard",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size={size}>
          <Share2 className="h-4 w-4 mr-1" />
          {showText && "Share"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this property</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {shareLinks.map((link) => (
              <Button
                key={link.name}
                variant="outline"
                size="lg"
                className="flex flex-col items-center gap-2 h-auto py-3 px-4 flex-1 min-w-[100px]"
                onClick={() => {
                  window.open(link.url(), "_blank", "noopener,noreferrer");
                  setOpen(false);
                }}
              >
                {link.icon}
                <span className="text-xs">{link.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="flex items-center border rounded-md p-2">
            <input
              className="flex-1 bg-transparent border-none outline-none text-sm px-2"
              value={getPropertyUrl()}
              readOnly
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={copyToClipboard}
              className="text-primary hover:text-primary"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 