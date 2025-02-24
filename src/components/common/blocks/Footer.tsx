import React from 'react';
import { Mail, Twitter, Linkedin, Youtube } from 'lucide-react';

import SectionContainer from '../containers/SectionContainer';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white mt-auto">
      {/* Top Section */}
      <div className="w-full py-8 bg-gray-800">
        <SectionContainer>
          <div className="text-center">
            <p className="text-xl font-medium">
              AiAxio is the #1 website for AI tools, used by over 50 million
              people.
            </p>
          </div>
        </SectionContainer>
      </div>

      {/* Middle Section */}
      <SectionContainer className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact & Social Media Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p>AiAxio</p>
              <p>Navana Newbury Place,</p>
              <p>Shobhanbag, Dhanmondi,</p>
              <p>Dhaka, Bangladesh.</p>
            </div>
            <div className="flex space-x-4 mt-4">
              <a
                href="mailto:contact@aiaxio.com"
                className="hover:text-blue-400"
              >
                <Mail size={24} />
              </a>
              <a href="https://twitter.com" className="hover:text-blue-400">
                <Twitter size={24} />
              </a>
              <a href="https://linkedin.com" className="hover:text-blue-400">
                <Linkedin size={24} />
              </a>
              <a href="https://youtube.com" className="hover:text-blue-400">
                <Youtube size={24} />
              </a>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="hover:text-blue-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-blue-400">
                  Terms
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="hover:text-blue-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-blue-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4">
              Stay updated with our latest AI tools and features.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
              />
              <button className="bg-blue-600 px-4 py-2 rounded-r hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Bottom Section */}
      <div className="w-full py-6 bg-gray-800">
        <SectionContainer>
          <div className="text-center">
            <p className="mb-2">
              A product of SOFTEKO
              <span className="mx-2">•</span>
            </p>
            <p className="text-gray-400">
              Copyright © 2025 aiaxio.com | All Rights Reserved.
            </p>
          </div>
        </SectionContainer>
      </div>
    </footer>
  );
};

export default Footer;
