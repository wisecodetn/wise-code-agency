import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    await client.connect();
    const db = client.db('wisecode');
    const collection = db.collection('blog_categories');
    
    console.log('Fetching all categories...');
    
    const categories = await collection.find({}).toArray();
    
    console.log('Found categories:', categories.length);
    
    await client.close();
    
    return NextResponse.json({
      success: true,
      data: categories,
      count: categories.length
    });
    
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch categories',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
