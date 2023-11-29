import type { Viewport } from 'next';
import { Ubuntu } from 'next/font/google';
import { cn } from '~/utils/cn';

import '~/styles/globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#bfe2fd',
  colorScheme: 'light',
};

const ubuntu = Ubuntu({
  weight: ['400', '500', '700'],
  style: ['normal'],
  subsets: ['latin-ext'],
});

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <html lang="en" className="antialiased">
    <body className={cn('bg-light-blue', ubuntu.className)}>{children}</body>
  </html>
);

export default RootLayout;
