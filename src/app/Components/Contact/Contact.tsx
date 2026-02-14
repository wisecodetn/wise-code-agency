import Image from 'next/image';
import React from 'react';
import { dataconfig } from '../../dataconfig';

const Contact = () => {
    return (
        <div>
            <section className="agenko-contact pt-130 pb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            
                            <div className="contact-info-wrapper mb-50 pf_fadeup">
                                <div className="shape"><span><Image src="/assets/images/pages/shape/world.png" alt="img" width={306} height={647}   /></span></div>
                                <ul>
                                    <li>
                                        <div className="phone"><a href={`tel:${dataconfig.contact.phone}`}>{dataconfig.contact.phone}</a></div>
                                    </li>
                                    <li>
                                        
                                        <div className="agenko-info-box">
                                            <div className="content">
                                                <h3>Address</h3>
                                                <p>ST. Badiaa Zaman Hamdhani, Khzema, Sousse, 4051, Tunisia</p>
                                                {/* <p>6801 Hollywood Blvd, Los Angeles, 
                                                        CA 90028</p> */}
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        
                                        <div className="agenko-info-box">
                                            <div className="content">
                                                <h3>Email</h3>
                                                <p><a href={`mailto:${dataconfig.contact.email}`}>{dataconfig.contact.email}</a></p>
                                                {/* <p><a href="mailto:wise.code.tn@gmail.com">wise.code.tn@gmail.com</a></p> */}
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        
                                        <div className="agenko-info-box">
                                            <div className="content">
                                                <h3>Follow</h3>
                                                <div className="social-link">
                                                    {dataconfig.contact.facebook && <a href={dataconfig.contact.facebook}><i className="bi bi-facebook"></i></a>}
                                                    {dataconfig.contact.instagram && <a href={dataconfig.contact.instagram}><i className="bi bi-instagram"></i></a>}
                                                    {dataconfig.contact.linkedin && <a target="_blank" href={dataconfig.contact.linkedin}><i className="bi bi-linkedin"></i></a>}
                                                    {dataconfig.contact.twitter && <a href={dataconfig.contact.twitter}><i className="bi bi-twitter-x"></i></a>}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            
                            <div className="agenko-content-box mb-50 pf_fadeup">
                                <div className="section-title mb-20">
                                    <span className="sub-title">Get In Touch</span>
                                    <h2>Get started and grow your business now.</h2>
                                </div>
                                <p className="mb-20">Start today to unlock opportunities and drive your business toward success.</p>
                                <form className="agenko-contact-form style-one" id="contact-form" action="contact.php" method="POST">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form_control" placeholder="Name" name="name" required />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form_control" placeholder="Email" name="email" required />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <input type="text" className="form_control" placeholder="Subject" name="subject" required />
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <textarea className="form_control" rows={5} placeholder="Message" name="message"></textarea>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-group">
                                                <button className="theme-btn">Send Message</button>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="form-message"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="agenko-map">
                
                <div className="map-box" data-aos="fade-up" data-aos-duration="1300">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1617.4206810516357!2d10.641737203016865!3d35.82836772596946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1302755757d292fb%3A0x1326410c92835505!2s.!5e0!3m2!1sfr!2stn!4v1771105044477!5m2!1sfr!2stn"></iframe>
                </div>
            </section>            
        </div>
    );
};

export default Contact;