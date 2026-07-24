import Image from 'next/image';
import Link from 'next/link';

import HeaderNav from '@/components/layout/HeaderNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-gray-200 border-b bg-white shadow-gray-900/10 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 2xl:max-w-[1344px]">
        <div className="relative flex h-16 items-center justify-between gap-6 md:justify-center">
          <div className="flex shrink-0 items-center md:absolute md:left-0">
            <Link href="/" className="group flex items-center whitespace-nowrap">
              <Image
                src="/main-logo.png"
                alt="My Tax Calculator — Pakistan income tax calculator logo"
                width={36}
                height={36}
                className="h-9 w-9 transition-transform duration-200 group-hover:scale-105"
              />
              <div className="ml-2.5 leading-none md:hidden xl:block">
                <span className="font-bold text-gray-900 text-xl tracking-tight">
                  My Tax Calculator
                </span>
                <span className="ml-1.5 hidden font-semibold text-emerald-600 text-sm 2xl:inline-block">
                  Pakistan
                </span>
              </div>
            </Link>
          </div>
          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
