// src/middleware/rateLimiter.ts
import { NextRequest, NextResponse } from 'next/server';

const rateLimitMap = new Map<string, number>();

export function rateLimitMiddleware(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') ?? 'unknown';
  const requests = rateLimitMap.get(ip) || 0;

  if (requests > 5) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  rateLimitMap.set(ip, requests + 1);
  return NextResponse.next();
}
