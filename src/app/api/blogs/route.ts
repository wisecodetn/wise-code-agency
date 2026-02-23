import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const slug = searchParams.get('slug');

    console.log('API Request - Slug:', slug, 'Page:', page, 'Limit:', limit);

    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db('wisecode');
    
    // Get blog_posts collection with status filter
    const collection = db.collection('blog_posts');
    
    let result;
    
    if (slug) {
      console.log('Fetching single blog by slug:', slug);
      // Fetch single blog by slug
      const blog = await collection.findOne({ 
        slug: slug, 
        status: "published" 
      });
      
      console.log('MongoDB result for slug:', blog);
      
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
        
        result = {
          success: true,
          data: formattedBlog
        };
      } else {
        result = {
          success: false,
          message: 'Blog post not found'
        };
      }
    } else {
      // Fetch paginated blogs
      const skip = (page - 1) * limit;
      
      const blogs = await collection
        .find({ status: "published" })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .toArray();
      
      const total = await collection.countDocuments({ status: "published" });
      
      const formattedBlogs = blogs.map((blog: any) => ({
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
      }));

      result = {
        success: true,
        data: formattedBlogs,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      };
    }

    console.log('API Response:', result);
    return NextResponse.json(result);

  } catch (error) {
    console.error('MongoDB API Error:', error);
    
    // Fallback to mock data if MongoDB fails
    const mockBlogs = [
      {
        id: '1',
        title: 'Web Development Best Practices for 2024',
        content: 'Discover the latest trends and best practices in modern web development including React, Next.js, and responsive design principles.',
        author: 'Wise Code Team',
        date: new Date().toLocaleDateString(),
        comments: 5,
        slug: 'web-development-best-practices',
        image: 'https://wise-code-agency.vercel.app/uploads/media/1768678677677_9fj8t0ome6n.webp',
        excerpt: 'Discover the latest trends and best practices in modern web development...',
        tags: ['web development', 'react', 'next.js'],
        category: 'Development'
      }
    ];
    
    const currentSlug = new URL(request.url).searchParams.get('slug');
    
    if (currentSlug) {
      // Return single blog for slug requests
      const blog = mockBlogs.find(b => b.slug === currentSlug);
      return NextResponse.json({
        success: !!blog,
        data: blog || null,
        message: blog ? null : 'Blog post not found'
      });
    } else {
      // Return paginated blogs for list requests
      const currentPage = parseInt(new URL(request.url).searchParams.get('page') || '1');
      const currentLimit = parseInt(new URL(request.url).searchParams.get('limit') || '10');
      const startIndex = (currentPage - 1) * currentLimit;
      const endIndex = startIndex + currentLimit;
      const paginatedBlogs = mockBlogs.slice(startIndex, endIndex);
      
      return NextResponse.json({
        success: true,
        data: paginatedBlogs,
        pagination: {
          page: currentPage,
          limit: currentLimit,
          total: mockBlogs.length,
          totalPages: Math.ceil(mockBlogs.length / currentLimit)
        }
      });
    }
  }
}
