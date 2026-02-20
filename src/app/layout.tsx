import { Source_Sans_3, Roboto } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "slick-carousel/slick/slick.css";
import "./assets/main.css";

const source_sans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--heading-font',
});
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--body-font',
});

export const metadata = {
  title: {
    absolute: '',
    default: 'Wise Code - Digital Agency & Web Development Services',
    template: '%s | Wise Code - Digital Agency Tunisia',
  },
  description: 'Wise Code is a leading digital agency in Tunisia specializing in web development, design, e-commerce solutions, and digital marketing. Transform your business with our expert services.',
  keywords: 'Wise Code, digital agency, web development, Tunisia, web design, e-commerce, digital marketing, SEO, branding, React, Next.js',
  authors: [{ name: 'Wise Code' }],
  creator: 'Wise Code',
  publisher: 'Wise Code',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wisecode.tn'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Wise Code - Digital Agency & Web Development Services',
    description: 'Leading digital agency in Tunisia offering web development, design, and digital marketing solutions to grow your business.',
    url: 'https://wisecode.tn',
    siteName: 'Wise Code',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wise Code - Digital Agency Tunisia',
    description: 'Expert web development and digital marketing services in Tunisia.',
    creator: '@wise_code_tn',
  },
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
};

export default function RootLayout({ children } : any ) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Wise Code" />
        <link rel="icon" href="/favicon.png" sizes="any" />
      </head>
      <body className={`${source_sans.variable} ${roboto.variable}`}>
        {children}
      </body>
    </html>
  );
}
