import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wisecode';
const client = new MongoClient(uri);

// GET - Récupérer tous les articles publiés avec pagination et filtres
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const categorySlug = searchParams.get('category') || '';
    const tagSlug = searchParams.get('tag') || '';
    
    const skip = (page - 1) * limit;

    await client.connect();
    const database = client.db('wisecode');

    // Construire le filtre - toujours publié uniquement
    const filter = { status: 'published' };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Si categorySlug est fourni, trouver d'abord la catégorie par son slug
    if (categorySlug) {
      console.log('CategorySlug provided:', categorySlug);
      const category = await database.collection('blog_categories').findOne({ 
        slug: categorySlug 
      });
      console.log('Found category:', category);
      
      if (category) {
        filter.categoryId = new ObjectId(category._id); // Convert to ObjectId
        console.log('Filter updated with categoryId:', category._id);
      } else {
        // Si la catégorie n'existe pas, retourner un résultat vide
        console.log('Category not found, returning empty result');
        return NextResponse.json({
          success: true,
          data: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0
          }
        });
      }
    }

    // Si tagSlug est fourni, trouver d'abord le tag par son slug
    if (tagSlug) {
      console.log('TagSlug provided:', tagSlug);
      const tag = await database.collection('blog_tags').findOne({ 
        slug: tagSlug 
      });
      console.log('Found tag:', tag);
      
      if (tag) {
        filter.tagIds = { $in: [new ObjectId(tag._id)] }; // Convert to ObjectId
        console.log('Filter updated with tagIds:', [tag._id]);
      } else {
        // Si le tag n'existe pas, retourner un résultat vide
        console.log('Tag not found, returning empty result');
        return NextResponse.json({
          success: true,
          data: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0
          }
        });
      }
    }

    console.log('Final filter:', JSON.stringify(filter, null, 2));

    // Récupérer les articles avec les informations associées
    const blogs = await database.collection('blog_posts')
      .aggregate([
        { $match: filter },
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
        },
        { $sort: { createdAt: -1 } },
        { $skip: skip },
        { $limit: limit }
      ])
      .toArray();

    // Compter le total pour la pagination
    const total = await database.collection('blog_posts').countDocuments(filter);

    return NextResponse.json({
      success: true,
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur serveur' },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
