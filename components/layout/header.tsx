"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown, Home, Building, Users, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Disable scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Function to determine which logo to show based on scroll state and theme
  const getLogoSrc = () => {
    if (!mounted) return "";
    
    if (theme === 'dark') {
      // In dark mode, always use white logo
      return "/logo-white.png";
    } else {
      // In light mode, use white logo when not scrolled on home page, otherwise use regular logo
      return (!scrolled && isHomePage) ? "/logo-white.png" : "/logo.png";
    }
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background/95 backdrop-blur-md shadow-md py-3"
            : isHomePage ? "bg-transparent py-5" : "bg-background/95 py-5 shadow-sm",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            {mounted && (
              <Image 
                src={getLogoSrc()} 
                alt="Nasir Property Logo" 
                width={100} 
                height={100} 
                className="object-contain" 
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="/" label="Home" scrolled={scrolled} isHomePage={isHomePage} />
            <NavLink href="/properties" label="Properties" scrolled={scrolled} isHomePage={isHomePage} />
            <NavLink href="/about" label="About Us" scrolled={scrolled} isHomePage={isHomePage} />
            <ThemeToggle 
              iconClassName={
                scrolled || !isHomePage 
                  ? "" 
                  : "text-white"
              } 
            />
            <Button asChild size="sm" className="ml-2">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button - Only visible when menu is closed */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle 
              iconClassName={
                scrolled || !isHomePage 
                  ? "" 
                  : "text-white"
              } 
            />
            <button
              onClick={toggleMenu}
              className={cn(
                "text-primary dark:text-primary-foreground",
                !scrolled && isHomePage ? "text-white" : ""
              )}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation - Separate from header */}
      <div 
        className={cn(
          "fixed inset-0 bg-background dark:bg-background z-40 md:hidden transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Close button positioned at the top right */}
        <div className="absolute top-5 right-4 z-50">
          <button
            onClick={closeMenu}
            className="text-primary dark:text-primary-foreground p-2"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <div className="h-full flex flex-col items-center justify-center p-4">
          {/* Logo in mobile menu */}
          <div className="mb-10">
            {mounted && (
              <Image 
                src={theme === 'dark' ? "/logo-white.png" : "/logo.png"} 
                alt="Nasir Property Logo" 
                width={150} 
                height={150} 
                className="object-contain" 
              />
            )}
          </div>
          
          <div className="flex flex-col items-center gap-8 w-full max-w-xs">
            <MobileNavLink href="/" label="Home" icon={<Home className="h-5 w-5" />} onClick={closeMenu} />
            <MobileNavLink href="/properties" label="Properties" icon={<Building className="h-5 w-5" />} onClick={closeMenu} />
            <MobileNavLink href="/about" label="About Us" icon={<Users className="h-5 w-5" />} onClick={closeMenu} />
            <MobileNavLink href="/contact" label="Contact" icon={<Phone className="h-5 w-5" />} onClick={closeMenu} />
            <Button asChild size="lg" className="mt-4 w-full">
              <Link href="/contact" onClick={closeMenu}>Get In Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

interface NavLinkProps {
  href: string;
  label: string;
  scrolled: boolean;
  isHomePage: boolean;
}

const NavLink = ({ href, label, scrolled, isHomePage }: NavLinkProps) => (
  <Link 
    href={href} 
    className={cn(
      "font-medium transition-colors duration-300 hover:text-primary",
      scrolled ? "text-foreground" : 
      isHomePage ? "text-white dark:text-gray-200" : "text-foreground"
    )}
  >
    {label}
  </Link>
);

interface MobileNavLinkProps {
  href: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
}

const MobileNavLink = ({ href, label, icon, onClick }: MobileNavLinkProps) => (
  <Link 
    href={href} 
    className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors"
    onClick={onClick}
  >
    {icon}
    {label}
  </Link>
);

export default Header;