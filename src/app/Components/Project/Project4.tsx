import React from 'react';
import ProjectCard3 from '../Card/ProjectCard3';
import { projectsList } from '../../data/projects';

const Project4 = () => {
    return (
        <section className="agenko-project pt-130 pb-100">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="row">
                            {projectsList.slice(0, 4).map((project, index) => (
                                <div key={project.id} className={index === 0 || index === 3 ? "col-lg-12" : "col-lg-6"}>
                                    <ProjectCard3
                                        img={project.image}
                                        title={project.category}
                                        content={project.title}
                                        slug={project.slug}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="row">
                            {projectsList.slice(4, 9).map((project, index) => (
                                <div key={project.id} className={index === 2 || index === 4 ? "col-lg-12" : "col-lg-6"}>
                                    <ProjectCard3
                                        img={project.image}
                                        title={project.category}
                                        content={project.title}
                                        slug={project.slug}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Project4;