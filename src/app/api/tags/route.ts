import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(request: NextRequest) {
  try {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri);
    
    await client.connect();
    const db = client.db('wisecode');
    const collection = db.collection('blog_tags');
    
    console.log('Fetching all tags...');
    
    const tags = await collection.find({}).toArray();
    
    console.log('Found tags:', tags.length);
    
    await client.close();
    
    return NextResponse.json({
      success: true,
      data: tags,
      count: tags.length
    });
    
  } catch (error) {
    console.error('Error fetching tags:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch tags',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
