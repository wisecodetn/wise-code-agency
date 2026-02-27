import BreadCumb from '../../Components/Common/BreadCumb';
import Faq1 from '../../Components/Faq/Faq1';
import Services4 from '../../Components/Services/Services4';
import WhyChoose1 from '../../Components/WhyChoose/WhyChoose1';
import { servicesList } from '../../data/services';

const page = () => {
  return (
    <>
      <BreadCumb
                Title="Our Services"
                content="Wise Code empowers businesses with innovative strategies & creative agency solutions. Our comprehensive digital services include web development, CMS/CRM solutions, e-commerce platforms, custom software development, UI/UX design, digital marketing, SEO optimization, branding, and reliable web hosting services tailored to your business needs."
            />
      <WhyChoose1></WhyChoose1> 
      <Services4 services={servicesList}></Services4> 
      <Faq1></Faq1>     
    </>
  );
};

export default page;