'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CopyIcon } from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { generateGoogleFormScript } from './utils'; 

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const GoogleFormTriggerDialog = ({open, onOpenChange }: Props) => {
    const params = useParams();
    const workflowId = params.workflowId as string;

    //Construct the webhook URL
    const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const webhookURL = `${baseURL}/api/webhooks/google-form?workflowId=${workflowId}`;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(webhookURL);
            toast.success('Webhook URL copied to clipboard');
        } catch {
            toast.error('Failed to copy URL');
        }
    }


    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Google Form Trigger Configuration</DialogTitle>
                    <DialogDescription>
                        Use this webhook URL in your Google Form&apos;s Apps Script to trigger this workflow when a form is submitted.
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4 pr-2'>
                    <div className='space-y-2'>
                        <Label htmlFor='webhook-url'>Webhook URL</Label>
                        <div className='flex gap-2 items-start'>
                            <Input
                              id='webhook-url'
                              value={webhookURL}
                              readOnly
                              className='font-mono text-xs sm:text-sm break-all flex-1 min-w-0'
                            />
                            <Button
                              type='button'
                              onClick={copyToClipboard}
                              variant={'outline'}
                              size={'icon'}
                              className='shrink-0'
                            >
                                <CopyIcon className='size-4' />
                            </Button>
                        </div>
                    </div>

                    <div className='rounded-lg bg-muted p-3 sm:p-4 space-y-2'>
                        <h4 className='font-medium text-sm'>Setup instructions:</h4>
                        <ol className='text-xs sm:text-sm text-muted-foreground space-y-1 list-decimal list-inside pl-1'>
                            <li className='break-words'>Open your Google Form</li>
                            <li className='break-words'>Click three dots menu → Apps Script</li>
                            <li className='break-words'>Copy and paste the script below</li>
                            <li className='break-words'>Replace WEBHOOK_URL with your webhook URL above</li>
                            <li className='break-words'>Save and click &quot;Triggers&quot; → Add Trigger</li>
                            <li className='break-words'>Choose: From form → On form submit → Save</li>
                        </ol>
                    </div>

                    <div className='rounded-lg bg-muted p-3 sm:p-4 space-y-3'>
                        <h4 className='font-medium text-sm'>Google Apps Script:</h4>
                        <Button
                            type='button'
                            variant={'outline'}
                            className='w-full sm:w-auto text-xs sm:text-sm'
                            onClick={async () => {
                                const script = generateGoogleFormScript(webhookURL);
                                try {
                                    await navigator.clipboard.writeText(script);
                                    toast.success('Google Apps Script copied to clipboard');

                                } catch {
                                    toast.error('Failed to copy Google Apps Script to clipboard');
                                }
                            }}
                        >
                            <CopyIcon className='size-4 mr-2'/>
                            Copy Google Apps Script
                        </Button>
                        <p className='text-xs text-muted-foreground break-words'>
                            This script includes your webhook URL and handles form submissions
                        </p>
                    </div>

                    <div className='rounded-lg bg-muted p-3 sm:p-4 space-y-2'>
                        <h4 className='font-medium text-sm'>Available Variables</h4>
                        <ul className='text-xs sm:text-sm text-muted-foreground space-y-2'>
                            <li className='flex flex-col sm:flex-row sm:items-center gap-1'>
                                <code className='bg-background px-1 py-0.5 rounded text-xs whitespace-nowrap inline-block'>
                                    {"{{googleForm.respondentEmail}}"}
                                </code>
                                <span className='sm:ml-1'>- Respondent&apos;s email</span>
                            </li>
                            <li className='flex flex-col sm:flex-row sm:items-center gap-1'>
                                <code className='bg-background px-1 py-0.5 rounded text-xs whitespace-nowrap inline-block'>
                                    {"{{googleForm.responses['Question Name']}}"}
                                </code>
                                <span className='sm:ml-1'>- Specific answer</span>
                            </li>
                            <li className='flex flex-col sm:flex-row sm:items-center gap-1'>
                                <code className='bg-background px-1 py-0.5 rounded text-xs whitespace-nowrap inline-block'>
                                    {"{{json googleForm.responses}}"}
                                </code>
                                <span className='sm:ml-1'>- All responses as JSON</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};