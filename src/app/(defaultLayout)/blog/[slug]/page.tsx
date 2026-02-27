import BlogDetails from '../../../Components/BlogDetails/BlogDetails';
import BreadCumb from '../../../Components/Common/BreadCumb';
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '../../../data/blogs';

interface Blog {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author?: any;
  createdAt?: string;
  slug: string;
  category?: {
    _id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
  };
  tags?: Array<{
    _id: string;
    name: string;
    slug: string;
    color: string;
    icon: string;
  }>;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const Page = async ({ params }: PageProps) => {
  // Unwrap the params Promise
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  // Transform blog data for BlogDetails component
  const transformedBlog = {
    id: blog._id.toString(),
    title: blog.title,
    content: blog.content,
    excerpt: blog.excerpt,
    author: blog.author?.name || 'Wise Code Team',
    date: blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
    comments: 0, // You can add comment count if available
    slug: blog.slug,
    image: blog.featuredImage 
      ? (blog.featuredImage.startsWith('http') 
          ? blog.featuredImage 
          : `https://wise-code-agency.vercel.app${blog.featuredImage}`)
      : 'https://wise-code-agency.vercel.app/assets/images/pages/blog/blog-single1.jpg',
    tags: blog.tags?.map(tag => tag.name) || [],
    category: blog.category?.name || 'General'
  };

  return (
    <div>
      <BreadCumb
        Title={blog.title}
        content={"Wise Code - " + blog.title}
        PageTitle={"Blog Details"}
      />
      <BlogDetails blog={transformedBlog} />
    </div>
  );
};

export default Page;
