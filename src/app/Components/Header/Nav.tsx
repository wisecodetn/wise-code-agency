import Link from 'next/link';
import DropDown from './DropDown';
import { servicesList } from '../../data/services';

export default function Nav({ setMobileToggle }) {
  // Filter out "Our Services" from the list
  const filteredServices = servicesList.filter(service => service.slug !== 'our-services');

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
            {filteredServices.map((service, index) => (
              <li key={index}>
                <Link href={`/service/${service.slug}`} onClick={() => setMobileToggle(false)}>
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </DropDown>
      </li>

      <li>
        <Link href="/project" onClick={() => setMobileToggle(false)}>
          Project
        </Link>
      </li> 
      
      <li>
        <Link href="/blog" onClick={() => setMobileToggle(false)}>
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
