import Image from 'next/image';
import React from 'react';

interface ProcessStep {
  step: number;
  title: string;
  description: string;
  image: string;
}

interface Process3Props {
  process: ProcessStep[];
}

const Process3 = ({ process }: Process3Props) => {
    return (
        <section className="agenko-process pt-130">
            <div className="container">
                <div className="agenko-process-wrapper-two pf_fadeup">
                    <div className="process-line"></div>
                    <div className="row">
                    {process.map((item, i) => (
                        <div key={i} className="col-lg-3 col-md-6 col-sm-12">
                            <div className="agenko-iconic-box style-eight mb-40">
                                <span className="agenko-dot mb-20"></span>
                                <div className="content">
                                    <span className="number">{item.step}</span>
                                    <h4 className="title">{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                                {/* <div className="thumbnail">
                                <Image src={item.image} alt={item.title} title={item.title} width={300} height={300}   />
                                </div> */}
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process3;