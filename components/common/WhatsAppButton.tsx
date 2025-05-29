"use client";

import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  className?: string;
}

const WhatsAppButton = ({ className }: WhatsAppButtonProps) => {
  const whatsappUrl = `https://wa.me/923182636767`;
  
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 transition-all duration-300 hover:scale-110",
        className
      )}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton; 