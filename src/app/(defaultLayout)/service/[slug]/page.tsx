import Brand4 from '../../../Components/Brand/Brand4';
import BreadCumb from '../../../Components/Common/BreadCumb';
import Pricing1 from '../../../Components/Pricing/Pricing1';
import Process3 from '../../../Components/Process/Process3';
import ServiceDetails from '../../../Components/ServiceDetails/ServiceDetails';
import React from 'react';
import { servicesList } from '../../../data/services';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesList.find(s => s.slug === slug);

  if (!service) {
    return {
      title: 'Service Not Found',
      description: 'The requested service could not be found.',
    };
  }

  return {
    title: `${service.name}`,
    description: service.description,
    keywords: service.keywords.join(', '),
    openGraph: {
      title: `${service.name}`,
      description: service.description,
      type: 'website',
      url: `https://wisecode.tn/service/${slug}`,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${service.name} | Wise Code Agency`,
      description: service.description,
      images: [service.image],
    },
    alternates: {
      canonical: `https://wisecode.tn/service/${slug}`,
    },
  };
}

const Page = async ({ params }: PageProps) => {
  // Unwrap params Promise
  const { slug } = await params;

  // Find service by slug
  const service = servicesList.find(s => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div>
      <BreadCumb
        Title={service.name}
        content={`Wise Code empowers businesses with innovative strategies & creative agency solutions - ${service.name}`}
        PageTitle="Services Details"
      />
      <ServiceDetails 
        service={{
          ...service,
          id: service.slug,
          image: service.image,
          features: [],
          pricing: []
        }}
      />
      <Process3 process={service.process} />
      {/* <Pricing1></Pricing1>
        <Brand4></Brand4>              */}
    </div>
  );
};

export default Page;