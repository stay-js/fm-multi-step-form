import type { Metadata } from 'next';
import { Form } from '~/components/form';

const title = 'Frontend Mentor | Multi-step form';
const description =
  'This is a solution to the Multi-step form challenge on Frontend Mentor. Built with Next.js and Tailwind CSS.';

export const metadata: Metadata = {
  metadataBase: new URL('https://fm-multi-step-form.znagy.hu'),

  authors: [{ name: 'Zétény Nagy', url: 'https://znagy.hu' }],
  creator: 'Zétény Nagy',

  keywords:
    'frontend mentor, frontend, mentor, fem, age calculator, age, calculator, challenge, next.js, nextjs, react, react-hook-form, zod, headlessui, tailwind, tailwindcss',

  title,

  applicationName: title,

  description,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    url: 'https://fm-multi-step-form.znagy.hu',
    title: description,
    siteName: title,
    locale: 'en-US',
  },

  twitter: {
    card: 'summary',
    title: title,
    description,
  },

  icons: {
    icon: '/favicon-32x32.png',
  },
};

const Page = () => (
  <main className="grid min-h-screen w-screen place-content-center">
    <Form />
  </main>
);

export default Page;
