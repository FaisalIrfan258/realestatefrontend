"use client";

import { FaWhatsapp } from "react-icons/fa";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  phoneNumber: string;
  className?: string;
}

const WhatsAppButton = ({ phoneNumber, className }: WhatsAppButtonProps) => {
  const formattedNumber = phoneNumber.replace(/\s+/g, "");
  const whatsappUrl = `https://wa.me/${formattedNumber}`;
  
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