'use client';

import Link from 'next/link';

export default function TrackedLink({ eventName, eventLabel, children, ...props }) {
  return (
    <Link {...props} onClick={() => {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, { event_label: eventLabel });
      }
    }}>
      {children}
    </Link>
  );
}
