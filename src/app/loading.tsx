import { ShieldCheck } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-primary/20 border-t-primary"></div>
        <ShieldCheck className="h-12 w-12 text-primary" />
      </div>
      <p className="mt-4 font-headline text-lg font-semibold text-primary">
        Loading PhishGuard...
      </p>
    </div>
  );
}
