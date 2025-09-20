'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/analytics';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GA_ID) {
      pageview(pathname);
    }
  }, [pathname]);

  return null;
}