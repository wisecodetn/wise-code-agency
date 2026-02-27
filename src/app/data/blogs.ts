import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/wisecode';
const client = new MongoClient(uri);

interface Blog {
  _id: ObjectId;
  title: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  author?: any;
  createdAt?: string;
  slug: string;
  category?: {
    _id: ObjectId;
    name: string;
    slug: string;
    color: string;
    icon: string;
  };
  tags?: Array<{
    _id: ObjectId;
    name: string;
    slug: string;
    color: string;
    icon: string;
  }>;
}

// Get single blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    await client.connect();
    const database = client.db('wisecode');

    // Trouver l'article par slug avec statut publié uniquement
    const blogs = await database.collection('blog_posts')
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

    if (blogs.length === 0) {
      return null;
    }

    return blogs[0] as Blog; // Retourner le premier (et seul) résultat

  } catch (error) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    return null;
  } finally {
    await client.close();
  }
}

// Get multiple blogs with pagination and filters
export async function getBlogs(options: {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  tag?: string;
} = {}): Promise<{
  blogs: Blog[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> {
  try {
    const { page = 1, limit = 10, search = '', category = '', tag = '' } = options;
    const skip = (page - 1) * limit;

    await client.connect();
    const database = client.db('wisecode');

    // Construire le filtre - toujours publié uniquement
    const filter: any = { status: 'published' };
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Si categorySlug est fourni, trouver d'abord la catégorie par son slug
    if (category) {
      const categoryDoc = await database.collection('blog_categories').findOne({ 
        slug: category 
      });
      
      if (categoryDoc) {
        filter.categoryId = new ObjectId(categoryDoc._id);
      } else {
        // Si la catégorie n'existe pas, retourner un résultat vide
        return {
          blogs: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0
          }
        };
      }
    }

    // Si tagSlug est fourni, trouver d'abord le tag par son slug
    if (tag) {
      const tagDoc = await database.collection('blog_tags').findOne({ 
        slug: tag 
      });
      
      if (tagDoc) {
        filter.tagIds = { $in: [new ObjectId(tagDoc._id)] };
      } else {
        // Si le tag n'existe pas, retourner un résultat vide
        return {
          blogs: [],
          pagination: {
            page,
            limit,
            total: 0,
            totalPages: 0
          }
        };
      }
    }

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

    return {
      blogs: blogs as Blog[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };

  } catch (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return {
      blogs: [],
      pagination: {
        page: 1,
        limit: 10,
        total: 0,
        totalPages: 0
      }
    };
  } finally {
    await client.close();
  }
}
