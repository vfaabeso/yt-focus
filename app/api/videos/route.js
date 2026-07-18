import { NextResponse } from 'next/server';

const BANNED_KEYWORDS = ['shorts', 'tiktok', 'trending', 'prank', 'challenge', 'compilation', 'reaction', 'gaming', 'funny moments'];
const BANNED_CATEGORIES = ['20', '23', '24']; // Gaming, Comedy, Entertainment

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

    const filtered = data.items.filter(item => {
      const title = item.snippet.title.toLowerCase();
      const desc = item.snippet.description.toLowerCase();
      const catId = item.snippet.categoryId;

      return !BANNED_KEYWORDS.some(w => title.includes(w) || desc.includes(w)) && !BANNED_CATEGORIES.includes(catId);
    });

    return NextResponse.json(filtered);
  } catch (err) {
    return NextResponse.json({ error: 'Server failure' }, { status: 500 });
  }
}