import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Projects - Wise Code Digital Agency Portfolio',
  description: 'Explore Wise Code\'s portfolio of successful web development, e-commerce, and digital marketing projects. See how we\'ve helped businesses transform their online presence.',
  keywords: ['Wise Code', 'projects', 'portfolio', 'web development projects', 'e-commerce projects', 'digital marketing case studies', 'Tunisia agency portfolio'],
  openGraph: {
    title: 'Our Projects - Wise Code Digital Agency Portfolio',
    description: 'Explore Wise Code\'s portfolio of successful web development, e-commerce, and digital marketing projects.',
    type: 'website',
    url: 'https://wisecode.tn/project',
    images: [
      {
        url: 'https://wisecode.tn/logo.png',
        width: 1200,
        height: 630,
        alt: 'Wise Code Projects Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Projects - Wise Code Digital Agency',
    description: 'Explore Wise Code\'s portfolio of successful web development and digital marketing projects.',
    images: ['https://wisecode.tn/logo.png']
  },
  alternates: {
    canonical: 'https://wisecode.tn/project'
  }
};
