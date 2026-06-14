import { useState, useEffect } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';
import Logo from './Logo';

interface NavbarProps {
  onEvaluateClick: () => void;
}

export default function Navbar({ onEvaluateClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Countries', href: '#countries' },
    { name: 'Eligibility Evaluator', href: '#evaluator' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      id="main-nav"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-stone-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="inline-block transition-transform hover:scale-102" id="nav-logo">
            <Logo />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-stone-600 hover:text-crimson-500 font-medium text-sm transition-colors relative py-2 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-crimson-500 after:transition-all hover:after:w-full"
                  id={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Quick Consultation CTA */}
            <button
              onClick={onEvaluateClick}
              className="bg-crimson-500 hover:bg-crimson-600 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-all shadow-md shadow-crimson-500/10 hover:shadow-xl hover:shadow-crimson-500/20 active:scale-95 flex items-center space-x-2"
              id="desktop-cta-btn"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Free Evaluation</span>
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-stone-700 hover:text-crimson-500 p-2 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <div
        className={`md:hidden fixed inset-x-0 bg-white/95 backdrop-blur-lg border-b border-stone-100 z-30 transition-all duration-300 flex flex-col px-6 py-6 space-y-4 ${
          isOpen ? 'top-[68px] opacity-100' : 'top-[-400px] opacity-0 pointer-events-none'
        }`}
        id="mobile-nav-panel"
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            className="text-stone-700 hover:text-crimson-500 font-semibold text-base py-2 transition-colors border-b border-stone-50"
            id={`mobile-nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
          >
            {link.name}
          </a>
        ))}
        <button
          onClick={() => {
            setIsOpen(false);
            onEvaluateClick();
          }}
          className="bg-crimson-500 hover:bg-crimson-600 text-white w-full py-3.5 rounded-lg font-semibold text-center shadow-lg transition-all flex justify-center items-center space-x-2 mt-2"
          id="mobile-cta-btn"
        >
          <PhoneCall className="h-4 w-4" />
          <span>Apply For Free Evaluation</span>
        </button>
      </div>
    </nav>
  );
}
