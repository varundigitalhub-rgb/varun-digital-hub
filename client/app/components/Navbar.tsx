"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/about-studio",
    label: "About Studio",
    // submenu: [
    //   { href: "/about-studio#team", label: "Our Team" },
    //   { href: "/about-studio#mission", label: "Our Mission" },
    //   { href: "/about-studio#values", label: "Core Values" },
    // ]
  },
  {
    href: "/what-we-do",
    label: "What We Do",
    // submenu: [
    //   { href: "/what-we-do#design", label: "Design Services" },
    //   { href: "/what-we-do#development", label: "Development" },
    //   { href: "/what-we-do#marketing", label: "Digital Marketing" },
    // ]
  },
  { href: "/pricing", label: "Pricing" },
  { href: "/our-work", label: "Our Work" },
  { href: "/contact", label: "Contact" },
  { href: "/blog", label: "Blog" },
  { href: "/live-demo", label: "Live Demo", highlight: true },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = `
    fixed top-0 left-0 right-0 z-50 transition-all duration-300
    ${isScrolled 
      ? 'bg-white shadow-lg py-4' 
      : isHome
        ? 'bg-transparent py-6'
        : 'bg-white shadow-md py-4'
    }
  `;

  const linkClasses = `
    relative px-4 py-2 font-medium text-sm transition-all
    ${isScrolled || !isHome
      ? 'text-purple-900 hover:text-purple-700'
      : 'text-white hover:text-purple-200'
    }
  `;

  return (
    <nav className={navClasses} suppressHydrationWarning>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {}
          <Link href="/" className="relative z-10">
            <Image src="/logo_digital_hub.png" alt="Varun Digital Hub Logo" className="rounded-md" width={60} height={60} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`
                  ${linkClasses}
                  ${link.highlight ? 'ml-4 bg-purple-700 text-white hover:bg-purple-800 rounded-full px-6' : ''}
                  ${pathname === link.href ? 'font-semibold' : ''}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-10 p-2"
            aria-label="Toggle menu"
          >
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${
              isScrolled || !isHome ? 'bg-purple-900' : 'bg-white'
            } ${isMobileMenuOpen ? 'transform rotate-45 translate-y-2' : ''}`} />
            <div className={`w-6 h-0.5 mb-1.5 transition-all ${
              isScrolled || !isHome ? 'bg-purple-900' : 'bg-white'
            } ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-6 h-0.5 transition-all ${
              isScrolled || !isHome ? 'bg-purple-900' : 'bg-white'
            } ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden fixed inset-0 z-40 bg-white transition-transform duration-300 transform
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}>
          <div className="pt-20 px-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 text-lg font-medium text-purple-900 border-b border-gray-100
                  ${pathname === link.href ? 'text-purple-700' : ''}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
