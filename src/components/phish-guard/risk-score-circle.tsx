'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface RiskScoreCircleProps {
  score: number;
  className?: string;
}

export function RiskScoreCircle({ score, className }: RiskScoreCircleProps) {
  const [displayScore, setDisplayScore] = React.useState(0);

  const normalizedScore = Math.min(Math.max(score, 0), 100);
  const circumference = 2 * Math.PI * 45; // 2 * pi * radius
  const offset = circumference - (normalizedScore / 100) * circumference;

  const colorClass = 
    normalizedScore > 75 ? 'text-destructive' :
    normalizedScore > 40 ? 'text-warning' :
    'text-success';

  const trackColorClass =
    normalizedScore > 75 ? 'stroke-destructive/20' :
    normalizedScore > 40 ? 'stroke-warning/20' :
    'stroke-success/20';
  
  const progressColorClass =
    normalizedScore > 75 ? 'stroke-destructive' :
    normalizedScore > 40 ? 'stroke-warning' :
    'stroke-success';

  React.useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setDisplayScore(normalizedScore);
    });
    return () => cancelAnimationFrame(animation);
  }, [normalizedScore]);
  

  return (
    <div className={cn("relative h-28 w-28", className)}>
      <svg className="h-full w-full" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className={cn("transform-gpu transition-colors duration-500", trackColorClass)}
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <circle
          className={cn("transform-gpu origin-center -rotate-90 transition-all duration-1000 ease-out", progressColorClass)}
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={displayScore > 0 ? offset : circumference}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("font-headline text-3xl font-bold", colorClass)}>
          {Math.round(displayScore)}
        </span>
        <span className="text-xs text-muted-foreground">Risk Score</span>
      </div>
    </div>
  );
}
