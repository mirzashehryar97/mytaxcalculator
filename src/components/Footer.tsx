import { Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkClass = 'text-emerald-100/70 hover:text-white text-sm transition-colors';

  return (
    <footer className="relative z-10 mt-8 bg-emerald-950/80 border-t border-white/10">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <img src="/main-logo.png" alt="My Tax Calculator Logo" className="h-9 w-9" />
              <span className="ml-2.5 text-xl font-extrabold text-white tracking-tight">My Tax Calculator</span>
            </div>
            <p className="mt-4 text-emerald-100/70 text-sm leading-relaxed max-w-md">
              A comprehensive income tax calculator for Pakistani taxpayers. Calculate your tax
              accurately using the latest FBR tax slabs for FY 2026-2027.
            </p>
            <div className="mt-5 flex space-x-3">
              <a
                href="#"
                aria-label="Twitter"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex items-center justify-center h-9 w-9 rounded-full bg-white/10 text-emerald-100 hover:bg-white/20 hover:text-white transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className={linkClass}>Home</Link></li>
              <li><Link to="/about" className={linkClass}>About Us</Link></li>
              <li><Link to="/tax-guides" className={linkClass}>Tax Guides</Link></li>
              <li><Link to="/privacy-policy" className={linkClass}>Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className={linkClass}>Terms of Service</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="https://www.fbr.gov.pk/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  FBR Website
                </a>
              </li>
              <li>
                <a href="https://iris.fbr.gov.pk/" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  IRIS Portal
                </a>
              </li>
              <li><Link to="/tax-guides" className={linkClass}>Tax Calculator Guide</Link></li>
              <li><Link to="/tax-news" className={linkClass}>Tax News</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-emerald-100/60 text-sm">
            &copy; {currentYear} My Tax Calculator. All rights reserved.
          </p>
          <p className="text-emerald-100/60 text-sm">
            Designed with ❤️ in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
