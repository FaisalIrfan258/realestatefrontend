import Link from "next/link";
import { Building, Mail, Phone, MapPin, Facebook } from "lucide-react";
import { FaWhatsapp} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building className="h-6 w-6 text-primary dark:text-primary" />
              <span className="font-bold text-xl text-white dark:text-white">Nasir Property</span>
            </div>
            <p className="mb-4 text-gray-400 dark:text-gray-400">
              Your trusted partner in finding the perfect property. We specialize in residential and commercial properties.
            </p>
            <div className="flex space-x-4 hover:text">
              <a href="https://www.facebook.com/people/NASIR-Property-Consultant/100087682164251/?rdid=7KGnxJddFuhheCza&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FHfRY18NY%2F" className="text-gray-400  transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400  transition-colors">
                <FaWhatsapp className="h-5 w-5" />
              </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white dark:text-white font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/properties" className="text-gray-400 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h3 className="text-white dark:text-white font-semibold text-lg mb-4">Property Types</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/properties?category=Apartment" className="text-gray-400 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                  Apartments
                </Link>
              </li>
              <li>
                <Link href="/properties?category=House" className="text-gray-400 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                  Houses
                </Link>
              </li>
              <li>
                <Link href="/properties?category=Villa" className="text-gray-400 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                  Flat
                </Link>
              </li>
              <li>
                <Link href="/properties?category=Commercial" className="text-gray-400 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors">
                  Commercial
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white dark:text-white font-semibold text-lg mb-4">Contact Us</h3>
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
                <Phone className="h-5 w-5" />
                <span className="">+92 318 2636767</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5" />
                <span className="">contact@nasirpropertyconsultant.com</span>
              </div>
              <Button asChild className="mt-2 bg-white text-black hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-100">
                <Link href="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800 dark:border-gray-800 py-6">
        <div className="container mx-auto px-4 text-center text-gray-500 dark:text-gray-500 text-sm">
          <p>© {currentYear} Nasir Property Consultant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;