import About1 from '../../Components/About/About1';
import BreadCumb from '../../Components/Common/BreadCumb';
import Faq2 from '../../Components/Faq/Faq2';
import WhoWeAre2 from '../../Components/WhoWeAre/WhoWeAre2';
import React from 'react';

const page = () => {
  return (
    <div>
            <BreadCumb
                Title="About Us"
                content="Wise Code empowers businesses with innovative strategies & creative agency solutions"
            ></BreadCumb>  
            <About1></About1>
            <WhoWeAre2></WhoWeAre2>    
            <Faq2></Faq2>   
    </div>
  );
};

export default page;