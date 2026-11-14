import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg px-6 text-center select-none">
      <span className="font-mono text-xs uppercase tracking-widest text-accent">
        Error 404
      </span>
      <h1 className="mt-4 font-serif text-6xl sm:text-8xl font-normal text-ink">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-base text-ink-muted leading-relaxed font-light">
        The requested URL was not found on this server. It may have been relocated or removed.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 font-mono text-xs uppercase tracking-wider text-white transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Return to Portfolio</span>
      </Link>
    </div>
  );
}

