// src/middleware/logger.ts
import { NextRequest, NextResponse } from 'next/server';

export function logMiddleware(req: NextRequest) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  return NextResponse.next();
}
