import { NextRequest, NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '3');

    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    await client.connect();
    const db = client.db('wisecode');
    
    // Get all collections
    const blogCollection = db.collection('blog_posts');
    const categoryCollection = db.collection('blog_categories');
    const tagCollection = db.collection('blog_tags');
    
    console.log('Fetching latest blogs, limit:', limit);
    
    const blogs = await blogCollection.find({ 
      status: "published" 
    })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();
    
    console.log('Found blogs:', blogs.length);
    
    // Fetch categories and tags for all blogs
    const formattedBlogs = await Promise.all(blogs.map(async (blog: any) => {
      let category = 'General';
      let tags = [];
      
      if (blog.categoryId) {
        const categoryDoc = await categoryCollection.findOne({ _id: new ObjectId(blog.categoryId) });
        category = categoryDoc ? categoryDoc.name : 'General';
      }
      
      if (blog.tagIds && blog.tagIds.length > 0) {
        const tagDocs = await tagCollection.find({ 
          _id: { $in: blog.tagIds.map(id => new ObjectId(id)) }
        }).toArray();
        tags = tagDocs.map(tag => tag.name);
      }
      
      return {
        id: blog._id.toString(),
        title: blog.title || 'Untitled Blog',
        content: blog.content || blog.description || 'No content available',
        author: typeof blog.author === 'string' ? blog.author : blog.author?.name || 'Wise Code Team',
        date: blog.date || blog.createdAt?.toLocaleDateString() || new Date().toLocaleDateString(),
        comments: blog.comments || 0,
        slug: blog.slug || blog._id.toString(),
        image: blog.image || blog.featuredImage || '/assets/images/pages/blog/blog1.jpg',
        excerpt: blog.excerpt || blog.content?.substring(0, 150) + '...' || 'No excerpt available',
        tags: tags,
        category: category
      };
    }));
    
    await client.close();
    
    return NextResponse.json({
      success: true,
      data: formattedBlogs,
      count: formattedBlogs.length
    });
    
  } catch (error) {
    console.error('Error fetching latest blogs:', error);
    return NextResponse.json({
      success: true,
      data: [],
      count: 0
    });
  }
}
