import { Calculator, Mail, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white backdrop-blur-sm border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center">
              <Calculator className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">My Tax Calculator</span>
            </div>
            <p className="mt-4 text-gray-600 text-sm">
              My Tax Calculator is a comprehensive tax calculator for Pakistani taxpayers. 
              Calculate your income tax accurately based on the latest tax slabs.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="mailto:contact@mytaxcalculator.pk" className="text-gray-400 hover:text-gray-500">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-600 hover:text-emerald-600 text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-emerald-600 text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tax-guides" className="text-gray-600 hover:text-emerald-600 text-sm">
                  Tax Guides
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 text-sm">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-base font-medium text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.fbr.gov.pk/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-600 text-sm"
                >
                  FBR Website
                </a>
              </li>
              <li>
                <a 
                  href="https://iris.fbr.gov.pk/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-emerald-600 text-sm"
                >
                  IRIS Portal
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 text-sm">
                  Tax Calculator Guide
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-emerald-600 text-sm">
                  Tax News
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} My Tax Calculator. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-4 md:mt-0">
            Designed with ❤️ in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 