'use client';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

import Hamburger from '../core/Hamburger';
import ThemeSwitcher from '../core/ThemeSwitcher'; // Relative imports
import SectionContainer from '../containers/SectionContainer';

export default function Navbar() {
  const navLinks = [
    { href: '/', label: 'home' },
    { href: '/about', label: 'about' },
    { href: '/contact', label: 'contact' },
    { href: '/write-blog', label: 'write' },
    { href: '/read-blog', label: 'read' },
    { href: '/view-product', label: 'product' },
  ];

  return (
    <div className="relative w-screen">
      <nav className="fixed top-0 w-screen bg-blue-100 dark:bg-slate-800 shadow-md z-[999] left-0 right-0">
        <SectionContainer>
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link
                href="/"
                className="text-xl font-semibold text-blue-600 dark:text-white leading-none"
              >
                AiAxio
              </Link>
            </div>

            <div className="hidden md:block">
              <div className="flex items-center space-x-2 md:space-x-4">
                {navLinks.map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-800 dark:text-white rounded-md text-base font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex gap-2 items-center">
              <Link href="/auth/signin">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="outline" size="sm">
                  Sign Up
                </Button>
              </Link>
              <ThemeSwitcher />
              <Hamburger />
            </div>
          </div>
        </SectionContainer>
      </nav>

      <div className="inline-block mt-14"></div>
    </div>
  );
}
