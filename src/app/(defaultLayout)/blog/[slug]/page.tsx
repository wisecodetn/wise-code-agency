import BlogDetails from '../../../Components/BlogDetails/BlogDetails';
import BreadCumb from '../../../Components/Common/BreadCumb';
import { notFound } from 'next/navigation';

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

interface ApiResponse {
  success: boolean;
  data?: Blog;
  error?: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/blogs/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Ensure fresh data
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData: ApiResponse = await response.json();
    
    if (responseData.success && responseData.data) {
      return responseData.data;
    } else {
      throw new Error(responseData.error || 'Invalid response format');
    }
  } catch (error) {
    console.error('Failed to fetch blog by slug:', error);
    return null;
  }
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
    id: blog._id,
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
        Title="Blog Details"
        content="Wise Code empowers businesses with innovative strategies & creative agency solutions"
      />
      <BlogDetails blog={transformedBlog} />
    </div>
  );
};

export default Page;
