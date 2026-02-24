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
  params: Promise<{
    slug: string;
  }>;
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
    return null;
  }
}

const page = async ({ params }: PageProps) => {
  // Unwrap the params Promise
  const { slug } = await params;
  
  console.log('Fetching blog for slug:', slug);

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    console.log('Blog not found for slug:', slug);
    notFound();
  }

  return (
    <div>
      <BreadCumb
        Title="Blog Details"
        content="Wise Code empowers businesses with innovative strategies & creative agency solutions"
      />
      <BlogDetails blog={blog} />
    </div>
  );
};

export default page;
