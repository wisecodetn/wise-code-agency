import Link from 'next/link';
import React from 'react';
import { projectsList } from '../../data/projects';

const Project2 = () => {

    

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
            {projectsList.slice(0,4).map((item, i) => (
                <div key={i} className="col-lg-6">
                    <div className="agenko-project-item style-one mb-45 pf_fadeup">
                        <div className="thumbnail">
                            <img src={item.image} alt={`${item.title} - Wise Code Portfolio`} />
                            <div className="project-button">
                                <Link href="/project/project-details"><i className="bi bi-plus-lg"></i></Link>
                            </div>
                        </div>
                        <div className="content">
                            <div className="project-categories">
                                {item.tags.map((tag, index) => (
                                    <a key={index} href="#">{tag}</a>
                                ))}
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