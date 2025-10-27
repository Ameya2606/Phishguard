'use client';

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import type { AnalysisResult as AnalysisResultType } from '@/lib/local-analyzer';
import { CheckCircle, AlertTriangle, ShieldAlert, Copy, Info } from 'lucide-react';
import { RiskScoreCircle } from './risk-score-circle';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

type ClassificationInfo = {
  variant: 'success' | 'warning' | 'destructive';
  icon: React.ElementType;
  title: string;
};

const classificationMap: Record<string, ClassificationInfo> = {
  Legitimate: {
    variant: 'success',
    icon: CheckCircle,
    title: 'Content looks safe',
  },
  Suspicious: {
    variant: 'warning',
    icon: AlertTriangle,
    title: 'Proceed with caution',
  },
  Phishing: {
    variant: 'destructive',
    icon: ShieldAlert,
    title: 'High-risk content detected',
  },
};

export function AnalysisResult({ result }: AnalysisResultProps) {
  const { toast } = useToast();
  const { classification, riskScore, summary, explanation } = result;

  const classificationInfo = classificationMap[classification] || classificationMap['Suspicious'];
  const Icon = classificationInfo.icon;

  const handleCopy = () => {
    const reportText = `PhishGuard Analysis Report
-----------------------------
Classification: ${classification}
Risk Score: ${riskScore}/100
Summary: ${summary}

Detailed Explanation:
${explanation}`;
    
    navigator.clipboard.writeText(reportText);
    toast({
      title: 'Report Copied!',
      description: 'The analysis report has been copied to your clipboard.',
    });
  };

  return (
    <Card className="shadow-lg animate-in fade-in-50 slide-in-from-bottom-5 duration-500">
      <CardHeader className="p-4 sm:p-6">
        <div className="flex flex-col-reverse sm:flex-row items-start justify-between gap-4">
          <div className="space-y-2">
            <Badge variant={classificationInfo.variant} className="text-sm">
              <Icon className="mr-1.5 h-4 w-4" />
              {classification}
            </Badge>
            <h2 className="font-headline text-2xl font-bold text-foreground">
              {classificationInfo.title}
            </h2>
            <p className="text-muted-foreground max-w-md">{summary}</p>
          </div>
          <div className="shrink-0">
             <RiskScoreCircle score={riskScore} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
        <Accordion type="single" collapsible defaultValue="item-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-semibold">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Detailed Explanation
              </div>
            </AccordionTrigger>
            <AccordionContent className="prose prose-sm dark:prose-invert max-w-none text-muted-foreground pt-2 space-y-4">
              <div className="whitespace-pre-line">
                {explanation.split('\n').map((line, index) => {
                  // Check if line starts with a number followed by a period (e.g., "1. ", "2. ")
                  const bulletMatch = line.match(/^(\d+)\.\s+(.+)$/);
                  if (bulletMatch) {
                    return (
                      <div key={index} className="flex gap-2 mb-2">
                        <span>•</span>
                        <span>{bulletMatch[2]}</span>
                      </div>
                    );
                  }
                  // Return regular text
                  return line.trim() ? <p key={index}>{line}</p> : null;
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleCopy} variant="ghost">
            <Copy className="mr-2 h-4 w-4" />
            Copy Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
