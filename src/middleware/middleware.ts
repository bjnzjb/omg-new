import { authMiddleware } from '../middleware/auth';
// import { logMiddleware } from '@/middleware/logger';
// import { rateLimitMiddleware } from '@/middleware/rateLimiter';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // let res = logMiddleware(req);
  // res = rateLimitMiddleware(req);
  let res = authMiddleware(req);
  return res;
}
