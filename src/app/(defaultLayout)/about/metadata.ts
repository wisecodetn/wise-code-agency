import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Wise Code - Leading Digital Agency in Tunisia',
  description: 'Learn about Wise Code, Tunisia\'s premier digital agency specializing in web development, e-commerce solutions, and digital marketing. Discover our team, values, and commitment to excellence.',
  keywords: ['Wise Code', 'about us', 'digital agency Tunisia', 'web development company', 'team', 'company profile', 'digital marketing agency'],
  openGraph: {
    title: 'About Wise Code - Leading Digital Agency in Tunisia',
    description: 'Learn about Wise Code, Tunisia\'s premier digital agency specializing in web development, e-commerce solutions, and digital marketing.',
    type: 'website',
    url: 'https://wisecode.tn/about',
    images: [
      {
        url: 'https://wisecode.tn/logo.png',
        width: 1200,
        height: 630,
        alt: 'Wise Code - Digital Agency Tunisia'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Wise Code - Digital Agency Tunisia',
    description: 'Learn about Wise Code, Tunisia\'s premier digital agency specializing in web development and digital marketing.',
    images: ['https://wisecode.tn/logo.png']
  },
  alternates: {
    canonical: 'https://wisecode.tn/about'
  }
};
