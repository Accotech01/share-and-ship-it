
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-brand-green">Share</span>
              <span className="text-2xl font-bold text-white">Circle</span>
            </Link>
            <p className="text-gray-300">
              Connecting generosity with need, creating a community of sharing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-standard">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-standard">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-standard">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-standard">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase">Explore</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/browse" className="text-gray-300 hover:text-white transition-standard">
                  Browse Items
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-300 hover:text-white transition-standard">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/recent" className="text-gray-300 hover:text-white transition-standard">
                  Recently Added
                </Link>
              </li>
              <li>
                <Link to="/featured" className="text-gray-300 hover:text-white transition-standard">
                  Featured Items
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase">How It Works</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/for-donors" className="text-gray-300 hover:text-white transition-standard">
                  For Donors
                </Link>
              </li>
              <li>
                <Link to="/for-recipients" className="text-gray-300 hover:text-white transition-standard">
                  For Recipients
                </Link>
              </li>
              <li>
                <Link to="/logistics" className="text-gray-300 hover:text-white transition-standard">
                  Logistics
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-300 hover:text-white transition-standard">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-standard">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-standard">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-300 hover:text-white transition-standard">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-standard">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col-reverse lg:flex-row justify-between items-center">
          <p className="mt-4 lg:mt-0 text-gray-300 text-sm">
            &copy; {new Date().getFullYear()} ShareCircle. All rights reserved.
          </p>
          <div className="flex flex-col sm:flex-row sm:space-x-6">
            <Link to="/terms" className="text-gray-300 hover:text-white transition-standard text-sm">
              Terms
            </Link>
            <Link to="/privacy" className="text-gray-300 hover:text-white transition-standard text-sm">
              Privacy
            </Link>
            <Link to="/accessibility" className="text-gray-300 hover:text-white transition-standard text-sm">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
