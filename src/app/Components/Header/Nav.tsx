import Link from 'next/link';
import DropDown from './DropDown';

export default function Nav({ setMobileToggle }) {
  return (
    <ul className="cs_nav_list fw-medium">
      <li>
        <Link href="/">Home</Link>
        
      </li>
      <li>
        <Link href="/about" onClick={() => setMobileToggle(false)}>
          About
        </Link>
        
      </li>  

      <li className="menu-item-has-children">
        <Link href="/service" onClick={() => setMobileToggle(false)}>
          Services
        </Link>
        <DropDown>
          <ul>
            <li>
              <Link href="/service" onClick={() => setMobileToggle(false)}>
                Our Services
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
                CMS/ CRM Development
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
                Custom Development
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
                E-Commerce
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
                Web & App Design
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
                Digital Marketing
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
                SEO Optimization
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
                Branding
              </Link>
            </li>
            <li>
              <Link href="/service/service-details" onClick={() => setMobileToggle(false)}>
                Hosting
              </Link>
            </li>
          </ul>
        </DropDown>
      </li>

      <li>
        <Link href="/project" onClick={() => setMobileToggle(false)}>
        Project
        </Link>
      </li> 
      
      <li>
        <Link href="/blog-sidebar" onClick={() => setMobileToggle(false)}>
          Blog
        </Link>
      </li>
      <li>
        <Link href="/contact" onClick={() => setMobileToggle(false)}>
          Contact
        </Link>
      </li>
    </ul>
  );
}
