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

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : isHomePage ? "bg-transparent py-5" : "bg-background/95 py-5 shadow-sm"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          {mounted && (
            <Image 
              src={theme === 'dark' ? "/logo-white.png" : "/logo.png"} 
              alt="Nasir Property Logo" 
              width={100} 
              height={100} 
              className=" object-contain" 
            />
          )}
          
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/" label="Home" scrolled={scrolled} isHomePage={isHomePage} />
          <NavLink href="/properties" label="Properties" scrolled={scrolled} isHomePage={isHomePage} />
          <NavLink href="/about" label="About Us" scrolled={scrolled} isHomePage={isHomePage} />
          <ThemeToggle />
          <Button asChild size="sm" className="ml-2">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={toggleMenu}
            className="z-50 text-primary dark:text-primary-foreground"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "fixed inset-0 bg-background dark:bg-background z-40 flex flex-col items-center justify-center gap-8 transform transition-transform duration-300 ease-in-out md:hidden",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <MobileNavLink href="/" label="Home" icon={<Home className="h-5 w-5" />} onClick={closeMenu} />
          <MobileNavLink href="/properties" label="Properties" icon={<Building className="h-5 w-5" />} onClick={closeMenu} />
          <MobileNavLink href="/about" label="About Us" icon={<Users className="h-5 w-5" />} onClick={closeMenu} />
          <MobileNavLink href="/contact" label="Contact" icon={<Phone className="h-5 w-5" />} onClick={closeMenu} />
          <Button asChild size="lg" className="mt-4 w-3/4 max-w-xs">
            <Link href="/contact" onClick={closeMenu}>Get In Touch</Link>
          </Button>
        </div>
      </div>
    </header>
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