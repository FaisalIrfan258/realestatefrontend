"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useChatbot, Message } from "@/hooks/useChatbot";
import Image from "next/image";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, isLoading, sendMessage, clearChat } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send initial message when chatbot is opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      sendMessage("Hi", true);
    }
  }, [isOpen, messages.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 sm:w-96 shadow-lg flex flex-col h-96 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-800 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <Image 
                src="/robot.png" 
                alt="Chatbot" 
                width={20} 
                height={20} 
                className="h-5 w-5 object-contain" 
              />
              <span className="font-medium">Property Assistant</span>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary-foreground/20"
                onClick={() => clearChat()}
                disabled={messages.length === 0 || isLoading}
                title="Clear chat"
              >
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Clear chat</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full hover:bg-primary-foreground/20"
                onClick={() => setIsOpen(false)}
                title="Close"
              >
                <XIcon className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.type === "user"
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted text-foreground"
                )}
              >
                {message.content}
              </div>
            ))}
            {isLoading && (
              <div className="bg-muted text-foreground max-w-[80%] rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce" />
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.2s]" />
                  <div className="h-2 w-2 rounded-full bg-current animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          <form onSubmit={handleSubmit} className="p-3 border-t border-gray-200 dark:border-gray-800">
            <div className="flex gap-2">
              <Input
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
                <SendIcon className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
          </form>
        </Card>
      ) : (
        <div 
          onClick={() => setIsOpen(true)}
          className="cursor-pointer"
        >
          <div className="animate-bounce-slow">
            <Image 
              src="/robot.png" 
              alt="Chatbot" 
              width={40} 
              height={40} 
              className="h-auto w-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function SendIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
} 