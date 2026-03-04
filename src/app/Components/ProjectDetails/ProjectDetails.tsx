import Image from 'next/image';
import React from 'react';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
  link: string;
}

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
    return (
        <section className="agenko-project-details pt-130 pb-90">
            <div className="container">
                <div className="project-details-wrapper">
                    {/* <div className="row">
                        <div className="col-lg-12">
                            <div className="agenko-image text-center mb-50 pf_fadeup">
                                <Image src={project.image} alt={project.title} title={project.title} width={1088} height={976} />
                            </div>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="agenko-content-box mb-50 pf_fadeup">
                                <h2>{project.title}</h2>
                                <p>{project.description}</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="project-duration-box pf_fadeup">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="agenko-info-box mb-30">
                                            <span className="title">Category</span>
                                            <h3>{project.category}</h3>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="agenko-info-box mb-30">
                                            <span className="title">Technologies</span>
                                            <h3>{project.tags.join(', ')}</h3>
                                        </div>
                                    </div>
                                    <div className="col-sm-12">
                                        <div className="agenko-info-box mb-30">
                                            <span className="title">Live Project</span>
                                            <h3>
                                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-primary">
                                                    Visit Website
                                                </a>
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="agenko-content-box pf_fadeup">
                                <p>{project.description}</p>
                                <h3>Project Overview</h3>
                                <p>This project showcases our expertise in {project.category.toLowerCase()} solutions. We implemented modern technologies including {project.tags.join(', ')} to deliver a high-quality, scalable solution that meets the client's requirements and exceeds expectations.</p>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="">
                                            <img src={project.image} alt={`${project.title} - Screenshot 1`} title={project.title} style={{ width: "100%"}} />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mt-40">
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="agenko-btn btn-primary">
                                        View Live Project
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectDetails;