'use client';

import { useEffect } from 'react';

export default function ArticleAnalytics({ sourceSlug, language }) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GA_ID) return;
    window.dataLayer = window.dataLayer || [];
    // Queue the event even if the Analytics script has not finished loading.
    function track() { window.dataLayer.push(arguments); }
    track('event', 'article_view', {
      send_to: process.env.NEXT_PUBLIC_GA_ID,
      article_id: sourceSlug,
      content_language: language,
    });
  }, [sourceSlug, language]);
  return null;
}
