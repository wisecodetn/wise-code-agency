import Link from 'next/link';
import React from 'react';

const Services2 = () => {
    return (
                <section className="agk-services gray-dark pt-130 pb-100">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-7">
                                    
                                    <div className="section-title mb-65 pf_fadeup">
                                        <span className="sub-title">Our Digital Services</span>
                                        <h2>Web Development, Digital Marketing & E-Commerce Solutions</h2>
                                    </div>
                                </div>
                                <div className="col-lg-5">
                                    <div className="text-box mb-60 pf_fadeup">
                                        <p>Wise Code delivers comprehensive digital solutions including custom web development, strategic digital marketing, and scalable e-commerce platforms to accelerate your business growth and maximize online success.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    
                                    <div className="agenko-card-item style-one mb-30 pf_fadeup">
                                        <div className="card-title">
                                            <div className="sn-number">01</div>
                                            <h3 className="title">Custom Web Development</h3>
                                        </div>
                                        <div className="content">
                                            <p>Professional <span>custom web development</span> services creating responsive, fast-loading websites with modern frameworks like React and Next.js to enhance user experience and drive business growth.</p>
                                        </div>
                                        <div className="card-button">
                                            <Link href="/service/service-details" className="theme-btn style-one">
                                                <span className="text-flip">
                                                    <span className="text">LEARN MORE</span>
                                                    <span className="text">LEARN MORE</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                   
                                    <div className="agenko-card-item style-one mb-30 pf_fadeup">
                                        <div className="card-title">
                                            <div className="sn-number">02</div>
                                            <h3 className="title">Digital Marketing & SEO</h3>
                                        </div>
                                        <div className="content">
                                            <p>Strategic <span>digital marketing and SEO</span> solutions to increase your online visibility, drive targeted traffic, and improve search rankings with data-driven campaigns and conversion optimization.</p>
                                        </div>
                                        <div className="card-button">
                                            <Link href="/service/service-details" className="theme-btn style-one">
                                                <span className="text-flip">
                                                    <span className="text">LEARN MORE</span>
                                                    <span className="text">LEARN MORE</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                   
                                    <div className="agenko-card-item style-one mb-30 pf_fadeup">
                                        <div className="card-title">
                                            <div className="sn-number">03</div>
                                            <h3 className="title">E-Commerce Development</h3>
                                        </div>
                                        <div className="content">
                                            <p>Complete <span>e-commerce development</span> with secure payment gateways, inventory management, and user-friendly shopping experiences to boost online sales and customer retention.</p>
                                        </div>
                                        <div className="card-button">
                                            <Link href="/service/service-details" className="theme-btn style-one">
                                                <span className="text-flip">
                                                    <span className="text">LEARN MORE</span>
                                                    <span className="text">LEARN MORE</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
    );
};

export default Services2;