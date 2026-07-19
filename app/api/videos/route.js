import { NextResponse } from 'next/server';
import { shouldBlockVideo } from '@/app/lib/contentPolicy';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'computer architecture';
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&maxResults=25&type=video&key=${apiKey}`
    );
    const data = await res.json();

    if (!data.items) return NextResponse.json([]);

    const filtered = data.items.filter(item => !shouldBlockVideo(item));

    return NextResponse.json(filtered);
  } catch (err) {
    return NextResponse.json({ error: 'Server failure' }, { status: 500 });
  }
}