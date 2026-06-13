import Image from 'next/image';
import Link from 'next/link';

import HeaderNav from './HeaderNav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-gray-100 border-b bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between min-[950px]:justify-center">
          <div className="flex items-center min-[950px]:absolute min-[950px]:left-0">
            <Link href="/" className="group flex items-center">
              <Image
                src="/main-logo.png"
                alt="My Tax Calculator — Pakistan income tax calculator logo"
                width={36}
                height={36}
                className="h-9 w-9 transition-transform duration-200 group-hover:scale-105"
              />
              <div className="ml-2.5 leading-none">
                <span className="font-bold text-gray-900 text-xl tracking-tight">
                  My Tax Calculator
                </span>
                <span className="ml-1.5 hidden font-semibold text-emerald-600 text-sm md:inline-block">
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
