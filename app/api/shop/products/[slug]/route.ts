import { NextRequest, NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'
import { getPublicUrl } from '../../../../../lib/gcs'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const client = new MongoClient(process.env.MONGODB_URI!)
  
  try {
    await client.connect()
    const db = client.db('PopCycle')
    
    // Find product by slug
    const product = await db.collection('products').findOne({ slug })
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }
    
    // Convert photo paths to public URLs
    const photos = product.designFiles?.photos || []
    const photoUrls = photos.map((path: string) => getPublicUrl(path))
    
    // Convert assets to public URLs if they exist
    const assets = product.assets?.map((asset: any) => ({
      ...asset,
      url: getPublicUrl(asset.url),
      thumbnail: asset.thumbnail ? getPublicUrl(asset.thumbnail) : undefined
    })) || []
    
    const productWithUrls = {
      ...product,
      _photoUrls: photoUrls,
      assets
    }
    
    return NextResponse.json(productWithUrls)
  } catch (error) {
    console.error('Error fetching product by slug:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  } finally {
    await client.close()
  }
}
