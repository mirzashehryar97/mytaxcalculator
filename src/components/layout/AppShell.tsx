'use client';

import { usePathname } from 'next/navigation';

import ClosingHadithStrip from '@/components/layout/ClosingHadithStrip';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();

  if (pathname.startsWith('/embed/')) {
    return (
      <div className="min-h-screen bg-[#f7f9f8]">
        <main className="min-h-screen w-full">{children}</main>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <div className="grid-pattern" />
      <div className="grid-squares" />
      <Header />

      <main className="relative z-10 mx-auto w-full max-w-7xl flex-grow px-4 py-12 sm:px-6 lg:px-8">
        {children}
      </main>

      <ClosingHadithStrip />

      <Footer />
    </div>
  );
}
