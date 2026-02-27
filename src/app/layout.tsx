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
    default: 'Wise Code - Digital Agency Tunisia',
    template: '%s | Wise Code - Digital Agency Tunisia',
  },
  description: 'Wise Code is a leading digital agency in Tunisia specializing in web development, design, e-commerce solutions, and digital marketing. Transform your business with our expert services.',
  keywords: ['Wise Code', 'digital agency', 'web development', 'Tunisia', 'web design', 'e-commerce', 'digital marketing', 'SEO', 'branding', 'React', 'Next.js', 'Laravel', 'PHP', 'JavaScript'],
  authors: [{ name: 'Wise Code', url: 'https://wisecode.tn' }],
  creator: 'Wise Code',
  publisher: {
    name: 'Wise Code',
    url: 'https://wisecode.tn',
    logo: 'https://wisecode.tn/logo.png'
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://wisecode.tn'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'fr-FR': '/fr',
      'ar-TN': '/ar'
    }
  },
  openGraph: {
    title: 'Wise Code - Digital Agency & Web Development Services',
    description: 'Leading digital agency in Tunisia offering web development, design, and digital marketing solutions to grow your business.',
    url: 'https://wisecode.tn',
    siteName: 'Wise Code',
    locale: 'en_US',
    type: 'website',
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
    title: 'Wise Code - Digital Agency Tunisia',
    description: 'Expert web development and digital marketing services in Tunisia.',
    creator: '@wise_code_tn',
    images: {
      url: 'https://wisecode.tn/logo.png',
      alt: 'Wise Code - Digital Agency Tunisia'
    }
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
  verification: {
    google: {
      // Add your Google Search Console verification code here
      // 'google-site-verification': 'your-verification-code'
    }
  },
  other: {
    'theme-color': '#2563eb',
    'msapplication-TileColor': '#2563eb',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default'
  }
};

export default function RootLayout({ children } : any ) {
  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Wise Code",
    "url": "https://wisecode.tn",
    "logo": "https://wisecode.tn/logo.png",
    "description": "Leading digital agency in Tunisia specializing in web development, design, e-commerce solutions, and digital marketing.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "Tunisia"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+216-XXXXXXXX",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://twitter.com/wise_code_tn",
      "https://linkedin.com/company/wise-code",
      "https://facebook.com/wise.code.tn"
    ],
    "services": [
      "Web Development",
      "Digital Marketing", 
      "E-commerce Solutions",
      "UI/UX Design",
      "SEO Services",
      "Branding"
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Basic Meta Tags */}
        <meta name="author" content="Wise Code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      </head>
      <body className={`${source_sans.variable} ${roboto.variable}`}>
        {children}
        
        {/* Google Analytics (add your tracking ID) */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          />
        )}
        
        {/* Schema Markup for Breadcrumbs */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://wisecode.tn"
                }
              ]
            }
          `}
        </script>
      </body>
    </html>
  );
}
