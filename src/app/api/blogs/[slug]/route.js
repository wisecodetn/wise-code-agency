import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wisecode';
const client = new MongoClient(uri);

// GET - Récupérer un article par son slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    await client.connect();
    const database = client.db('wisecode');

    // Trouver l'article par slug avec statut publié uniquement
    const blog = await database.collection('blog_posts')
      .aggregate([
        { 
          $match: { 
            slug: slug, 
            status: 'published' 
          } 
        },
        {
          $lookup: {
            from: 'blog_categories',
            localField: 'categoryId',
            foreignField: '_id',
            as: 'category'
          }
        },
        {
          $lookup: {
            from: 'blog_tags',
            localField: 'tagIds',
            foreignField: '_id',
            as: 'tags'
          }
        },
        {
          $unwind: {
            path: '$category',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            title: 1,
            slug: 1,
            excerpt: 1,
            content: 1,
            featuredImage: 1,
            galleryImages: 1,
            author: 1,
            categoryId: 1,
            tagIds: 1,
            status: 1,
            publishedAt: 1,
            createdAt: 1,
            updatedAt: 1,
            meta: 1,
            category: {
              _id: 1,
              name: 1,
              slug: 1,
              color: 1,
              icon: 1
            },
            tags: {
              _id: 1,
              name: 1,
              slug: 1,
              color: 1,
              icon: 1
            }
          }
        }
      ])
      .toArray();

    if (blog.length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Blog post not found' 
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blog[0] // Retourner le premier (et seul) résultat
    });

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
