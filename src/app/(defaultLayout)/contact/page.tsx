import BreadCumb from '../../Components/Common/BreadCumb';
import Contact from '../../Components/Contact/Contact';
import React from 'react';
import Faq2 from '../../Components/Faq/Faq2';

const page = () => {
  return (
    <div>
            <BreadCumb
                Title="Contact"
                content="Wise Code empowers businesses with innovative strategies & creative agency solutions"
            ></BreadCumb>   
            <Contact></Contact>    
            
    </div>
  );
};

export default page;