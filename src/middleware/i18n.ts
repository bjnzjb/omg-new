// src/middleware/i18n.ts
import { NextRequest, NextResponse } from 'next/server';

export function i18nMiddleware(req: NextRequest) {
  const lang = req.headers.get('accept-language')?.split(',')[0] || 'en';
  const supportedLanguages = ['en', 'fr', 'es'];

  if (!supportedLanguages.includes(lang)) {
    return NextResponse.redirect(new URL(`/en`, req.url));
  }

  return NextResponse.next();
}
