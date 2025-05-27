"use client";

import Link from "next/link";
import Image from "next/image";
import { Building, Mail, Phone, MapPin, Facebook } from "lucide-react";
import { FaWhatsapp} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <footer className="bg-muted dark:bg-muted text-muted-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              {mounted && (
                <Image 
                  src={theme === 'dark' ? "/logo-white.png" : "/logo.png"}
                  alt="Nasir Property Logo" 
                  width={180} 
                  height={180} 
                  className="object-contain" 
                />
              )}
            </div>
            <p className="mb-4 text-muted-foreground dark:text-muted-foreground">
              Your trusted partner in finding the perfect property. We specialize in residential and commercial properties.
            </p>
            <div className="flex space-x-4 hover:text">
              <a href="https://www.facebook.com/people/NASIR-Property-Consultant/100087682164251/?rdid=7KGnxJddFuhheCza&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FHfRY18NY%2F" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaWhatsapp className="h-5 w-5" />
              </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-foreground dark:text-foreground font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h3 className="text-foreground dark:text-foreground font-semibold text-lg mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?category=Apartment" className="text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?category=House" className="text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link href="/properties?category=Villa" className="text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary transition-colors">
                  Flat
                </Link>
              </li>
              <li>
                <Link href="/properties?category=Commercial" className="text-muted-foreground hover:text-primary dark:text-muted-foreground dark:hover:text-primary transition-colors">
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-foreground dark:text-foreground font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3">
              {/* Address 1 */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span className="">Plot no. 149, street 04, sector C, Akhtar colony Karachi.</span>
              </div>
              
              {/* Address 2 */}
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span className="">Plot no. 05, street No. 02, sector B, main double road Akhtar colony DHA phase 1 Karachi near Nadra mega center.</span>
              </div>
            
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <span className="">+92 318 2636767</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <span className="">contact@nasirpropertyconsultant.com</span>
              </div>
              <Button asChild className="mt-2">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border dark:border-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground dark:text-muted-foreground text-sm">
          <p>© {currentYear} Nasir Property Consultant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;