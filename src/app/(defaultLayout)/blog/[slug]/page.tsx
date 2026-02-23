import BlogDetails from '../../../Components/BlogDetails/BlogDetails';
import BreadCumb from '../../../Components/Common/BreadCumb';
import { notFound } from 'next/navigation';

interface Blog {
  id: string;
  title: string;
  content: string;
  image?: string;
  author?: string;
  date?: string;
  comments?: number;
  slug?: string;
  excerpt?: string;
  tags?: string[];
  category?: string;
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    // Direct MongoDB connection for server-side
    const { MongoClient } = require('mongodb');
    const uri = process.env.MONGODB_URI;
    
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('wisecode');
    const collection = db.collection('blog_posts');
    
    console.log('Direct MongoDB query for slug:', slug);
    
    const blog = await collection.findOne({ 
      slug: slug, 
      status: "published" 
    });
    
    console.log('Direct MongoDB result:', blog);
    
    if (blog) {
      const formattedBlog = {
        id: blog._id.toString(),
        title: blog.title || 'Untitled Blog',
        content: blog.content || blog.description || 'No content available',
        author: typeof blog.author === 'string' ? blog.author : blog.author?.name || 'Wise Code Team',
        date: blog.date || blog.createdAt?.toLocaleDateString() || new Date().toLocaleDateString(),
        comments: blog.comments || 0,
        slug: blog.slug || blog._id.toString(),
        image: blog.image || blog.featuredImage || '/assets/images/pages/blog/blog1.jpg',
        excerpt: blog.excerpt || blog.content?.substring(0, 150) + '...' || 'No excerpt available',
        tags: blog.tags || [],
        category: blog.category || 'General'
      };
      
      await client.close();
      return formattedBlog;
    }
    
    await client.close();
    return null;
  } catch (error) {
    console.error('Direct MongoDB error:', error);
    
    // Fallback to API fetch
    try {
      const baseUrl = process.env.NODE_ENV === 'production' 
        ? process.env.NEXT_PUBLIC_API_URL || 'https://your-domain.com'
        : 'http://localhost:3000';
      
      const response = await fetch(`${baseUrl}/api/blogs?slug=${slug}`, {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Fallback API fetch:', `${baseUrl}/api/blogs?slug=${slug}`);
      console.log('Fallback response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Fallback response data:', data);
        
        if (data.success && data.data) {
          return data.data;
        }
      } else {
        console.error('Fallback API response not ok:', response.status, response.statusText);
      }
    } catch (fetchError) {
      console.error('Fallback fetch error:', fetchError);
    }
  }
  
  return null;
}

const page = async ({ params }: PageProps) => {
  const blog = await getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <BreadCumb
        Title={blog.title}
        content="Wise Code empowers businesses with innovative strategies & creative agency solutions"
      />
      <BlogDetails blog={blog} />
    </div>
  );
};

export default page;