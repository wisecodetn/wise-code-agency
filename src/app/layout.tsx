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
    default: 'Wise Code - Your Digital Partner',
    template: '%s | Wise Code - Your Digital Partner',
  },
  description: 'Wise Code - Your Digital Partner',
  openGraph: {
    title: 'Wise Code - Your Digital Partner',
    description: 'Wise Code - Your Digital Partner',
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
