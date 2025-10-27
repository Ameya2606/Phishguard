import { ShieldCheck } from 'lucide-react';
import { ThemeToggle } from '../ui/theme-toggle';

export function Header() {
  return (
    <header className="relative text-center">
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center gap-3">
        <ShieldCheck className="h-10 w-10 text-primary" />
        <h1 className="font-headline text-4xl font-bold tracking-tighter text-foreground sm:text-5xl">
          PhishGuard
        </h1>
      </div>
      <p className="mt-2 text-lg text-muted-foreground">
        Your AI-powered shield against phishing threats.
      </p>
    </header>
  );
}
