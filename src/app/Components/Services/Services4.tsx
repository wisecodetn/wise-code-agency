import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Service {
  name: string;
  slug: string;
  description: string;
  keywords: string[];
  process: {
    step: number;
    title: string;
    description: string;
    image: string;
  }[];
}

interface Services4Props {
  services?: Service[];
}

const Services4 = ({ services }: Services4Props) => {
    

    return (
        <section className="agk-services">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        
                        <div className="section-title mb-60 text-center pf_zoomIn">
                            <span className="sub-title">Our Service</span>
                            <h2>Top Services We Offer</h2>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-12">
                    {services?.map((item, i) => (
                        <div key={i} className="agenko-card-item style-two mb-10 pf_fadeup">
                            <div className="thumbnail">
                            <Image src={"/logo.png"} alt={item.name} title={item.name} width={80} height={80} className="img-fluid"  />
                            </div>
                            <div className="card-title">
                                <h2><Link href={`/service/${item.slug}`}>{item.name}</Link></h2>
                                <h4>{item.description}</h4>
                            </div>
                            
                        </div>
                    ))}
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services4;