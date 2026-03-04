import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services - Web Development & Digital Marketing Solutions',
  description: 'Discover Wise Code\'s comprehensive digital services: custom web development, CMS/CRM solutions, e-commerce platforms, digital marketing, SEO optimization, branding, and web hosting.',
  keywords: ['Wise Code', 'services', 'web development', 'digital marketing', 'SEO services', 'e-commerce development', 'branding', 'web hosting Tunisia'],
  openGraph: {
    title: 'Our Services - Web Development & Digital Marketing Solutions',
    description: 'Discover Wise Code\'s comprehensive digital services: custom web development, digital marketing, SEO, and e-commerce solutions.',
    type: 'website',
    url: 'https://wisecode.tn/service',
    images: [
      {
        url: 'https://wisecode.tn/logo.png',
        width: 1200,
        height: 630,
        alt: 'Wise Code Digital Services'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services - Wise Code Digital Agency',
    description: 'Discover Wise Code\'s comprehensive digital services: web development, digital marketing, SEO, and e-commerce solutions.',
    images: ['https://wisecode.tn/logo.png']
  },
  alternates: {
    canonical: 'https://wisecode.tn/service'
  }
};
