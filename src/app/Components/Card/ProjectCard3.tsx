import Link from 'next/link';
import React from 'react';

interface ProjectCard3Props {
  img: string;
  title: string;
  content: string;
  slug: string;
}

const ProjectCard3 = ({ img, title, content, slug }: ProjectCard3Props) => {
    return (
        <div className="agenko-project-item style-four mb-30 pf_fadeup">
            <div className="thumbnail">
                <img src={img} alt="Project Image" />
                <div className="hover-content">
                    <div className="content">
                        <a className="category-btn" href="#">{title}</a>
                        <h4><Link href={`/project/${slug}`}>{content}</Link></h4>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectCard3;