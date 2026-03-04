import BreadCumb from '../../../Components/Common/BreadCumb';
import ProjectDetails from '../../../Components/ProjectDetails/ProjectDetails';
import React from 'react';
import { projectsList } from '../../../data/projects';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  // Unwrap params Promise
  const { slug } = await params;

  // Find project by slug
  const project = projectsList.find(p => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <BreadCumb
        Title={project.title}
        content={`Wise Code empowers businesses with innovative strategies & creative agency solutions - ${project.title}`}
        PageTitle="Project Details"
      />
      <ProjectDetails project={project} />
    </div>
  );
};

export default Page;
