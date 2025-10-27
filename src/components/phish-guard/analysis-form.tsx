'use client';

import * as React from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Bot, Link as LinkIcon, Loader2, Send, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { sampleData } from '@/lib/sample-data';

const formSchema = z.object({
  content: z.string()
    .min(10, { message: 'Please enter at least 10 characters to analyze.' })
    .max(5000, { message: 'Content must not exceed 5000 characters.' }),
});

type AnalysisType = 'url' | 'message';

interface AnalysisFormProps {
  onSubmit: (content: string) => void;
  isPending: boolean;
}

export function AnalysisForm({ onSubmit, isPending }: AnalysisFormProps) {
  const [analysisType, setAnalysisType] = React.useState<AnalysisType>('url');
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { content: '' },
    mode: 'onChange',
  });

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values.content);
  };

  const handleTrySample = (type: AnalysisType, content: string) => {
    setAnalysisType(type);
    form.setValue('content', content, { shouldValidate: true });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Bot />
          Start Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={analysisType} onValueChange={(value) => setAnalysisType(value as AnalysisType)} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="url"><LinkIcon className="mr-2" /> URL</TabsTrigger>
            <TabsTrigger value="message"><Sparkles className="mr-2" /> Message</TabsTrigger>
          </TabsList>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 pt-4">
              <TabsContent value="url" className="m-0">
                <InputForm form={form} placeholder="https://example.com" isPending={isPending} />
              </TabsContent>
              <TabsContent value="message" className="m-0">
                <TextareaForm form={form} placeholder="Enter email content or a suspicious message..." isPending={isPending} />
              </TabsContent>
              
              <div className="flex flex-col sm:flex-row gap-2 justify-between items-center">
                 <div className="flex gap-2 items-center flex-wrap">
                    <span className="text-sm text-muted-foreground">Try a sample:</span>
                    <Button type="button" size="sm" variant="outline" onClick={() => handleTrySample('url', sampleData.suspiciousUrl)}>Suspicious URL</Button>
                    <Button type="button" size="sm" variant="outline" onClick={() => handleTrySample('message', sampleData.phishingMessage)}>Phishing Message</Button>
                </div>
                <Button type="submit" disabled={isPending || !form.formState.isValid} className="w-full sm:w-auto">
                  {isPending ? <Loader2 className="animate-spin" /> : <Send />}
                  Analyze
                </Button>
              </div>
            </form>
          </Form>
        </Tabs>
      </CardContent>
    </Card>
  );
}

interface FormComponentProps {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    placeholder: string;
    isPending: boolean;
}

function InputForm({ form, placeholder, isPending }: FormComponentProps) {
    return (
        <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

function TextareaForm({ form, placeholder, isPending }: FormComponentProps) {
    return (
        <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Textarea placeholder={placeholder} {...field} disabled={isPending} rows={5} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}
