'use client';

import { useState, useTransition } from 'react';
import type { AnalysisResult as AnalysisResultType } from '@/lib/local-analyzer';
import { analyzeContentLocally } from '@/lib/local-analyzer';

import { Header } from '@/components/phish-guard/header';
import { AnalysisForm } from '@/components/phish-guard/analysis-form';
import { AnalysisResult } from '@/components/phish-guard/analysis-result';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertCircle } from 'lucide-react';

function AnalysisSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-5 w-48" />
          </div>
          <Skeleton className="h-24 w-24 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
  );
}

export default function Home() {
  const [result, setResult] = useState<AnalysisResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleAnalysis = (content: string) => {
    if (!content.trim()) return;
    setResult(null);
    setError(null);
    startTransition(async () => {
      try {
        if (content.trim().length < 5) {
          setError('Please enter at least 5 characters for analysis.');
          return;
        }
        
        const data = await analyzeContentLocally(content.trim());
        setResult(data);
        setError(null);
      } catch (e) {
        console.error('Analysis failed:', e);
        setError('An unexpected error occurred during analysis. Please try again later.');
        setResult(null);
      }
    });
  };

  return (
    <div className="flex flex-col items-center min-h-dvh bg-background text-foreground font-body">
      <div className="w-full max-w-3xl flex-1 p-4 md:p-6 space-y-8">
        <Header />
        <main>
          <AnalysisForm onSubmit={handleAnalysis} isPending={isPending} />

          <div className="mt-8">
            {isPending && <AnalysisSkeleton />}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Analysis Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {result && <AnalysisResult result={result} />}
          </div>
        </main>
      </div>
    </div>
  );
}
