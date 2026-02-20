import Link from 'next/link';
import React from 'react';

const Project2 = () => {

    const chooseContent = [
        {img:'/assets/images/digital-agency/project/project1.jpg', title:'E-Commerce Platform Development', cat1:'Web Development', cat2:'E-Commerce'},
        {img:'/assets/images/digital-agency/project/project2.jpg', title:'Corporate Website Redesign', cat1:'Web Design', cat2:'Branding'},
        {img:'/assets/images/digital-agency/project/project3.jpg', title:'Digital Marketing Campaign', cat1:'Marketing', cat2:'SEO'},
        {img:'/assets/images/digital-agency/project/project4.jpg', title:'Mobile Banking Application', cat1:'Mobile App', cat2:'Fintech'},
      ]; 

    return (
        <section className="agk-project pt-130 pb-80">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-7">
                    
                    <div className="section-title mb-60 pf_fadeup">
                        <span className="sub-title">Our Portfolio</span>
                        <h2>Our Recent Projects</h2>
                    </div>
                </div>
                <div className="col-lg-5">
                    <div className="agk-button mb-60 float-lg-end pf_fadeup">
                        <Link href="/project" className="theme-btn style-one">
                            <span className="text-flip">
                                <span className="text">View All Work</span>
                                <span className="text">View All Work</span>
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row">
            {chooseContent.map((item, i) => (
                <div key={i} className="col-lg-6">
                    <div className="agenko-project-item style-one mb-45 pf_fadeup">
                        <div className="thumbnail">
                            <img src={item.img} alt={`${item.title} - Wise Code Portfolio`} />
                            <div className="project-button">
                                <Link href="/project/project-details"><i className="bi bi-plus-lg"></i></Link>
                            </div>
                        </div>
                        <div className="content">
                            <div className="project-categories">
                                <a href="#">{item.cat1}</a>
                                <a href="#">{item.cat2}</a>
                            </div>
                            <h4 className="title"><Link href="/project/project-details">{item.title}</Link></h4>
                        </div>
                    </div>
                </div>
            ))}


            </div>
        </div>
    </section>
    );
};

export default Project2;