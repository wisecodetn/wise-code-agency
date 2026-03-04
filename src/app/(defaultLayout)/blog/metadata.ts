import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Wise Code Digital Marketing & Web Development Insights',
  description: 'Read the latest insights on web development, digital marketing, SEO, and e-commerce from Wise Code\'s expert team. Stay updated with industry trends and best practices.',
  keywords: ['Wise Code', 'blog', 'digital marketing insights', 'web development tips', 'SEO best practices', 'e-commerce trends', 'Tunisia digital agency blog'],
  openGraph: {
    title: 'Blog - Wise Code Digital Marketing & Web Development Insights',
    description: 'Read the latest insights on web development, digital marketing, SEO, and e-commerce from Wise Code\'s expert team.',
    type: 'website',
    url: 'https://wisecode.tn/blog',
    images: [
      {
        url: 'https://wisecode.tn/logo.png',
        width: 1200,
        height: 630,
        alt: 'Wise Code Blog - Digital Marketing Insights'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Wise Code Digital Agency',
    description: 'Read the latest insights on web development, digital marketing, and SEO from Wise Code\'s expert team.',
    images: ['https://wisecode.tn/logo.png']
  },
  alternates: {
    canonical: 'https://wisecode.tn/blog'
  }
};
