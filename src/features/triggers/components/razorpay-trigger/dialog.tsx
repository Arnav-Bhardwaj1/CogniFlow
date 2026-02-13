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


interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export const RazorPayTriggerDialog = ({open, onOpenChange }: Props) => {
    const params = useParams();
    const workflowId = params.workflowId as string;

    //Construct the webhook URL
    const baseURL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const webhookURL = `${baseURL}/api/webhooks/razorpay?workflowId=${workflowId}`;

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
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>RazorPay Trigger Configuration</DialogTitle>
                    <DialogDescription>
                        Configure this webhook URL in your RazorPay Dashboard to trigger this workflow on payment events.
                    </DialogDescription>
                </DialogHeader>
                <div className='space-y-4'>
                    <div className='space-y-2'>
                        <Label htmlFor='webhook-url'>Webhook URL</Label>
                        <div className='flex gap-2'>
                            <Input
                              id='webhook-url'
                              value={webhookURL}
                              readOnly
                              className='font-mono text-sm'
                            />
                            <Button
                              type='button'
                              onClick={copyToClipboard}
                              variant={'outline'}
                              size={'icon'}
                            >
                                <CopyIcon className='size-4' />
                            </Button>
                        </div>
                    </div>

                    <div className='rounded-lg bg-muted p-4 space-y-2'>
                        <h4 className='font-medium text-sm'>Setup instructions:</h4>
                        <ol className='text-sm text-muted-foreground space-y-1 list-decimal list-inside'>
                            <li>Open your RazorPay Dashboard</li>
                            <li>Go to Settings → Webhooks</li>
                            <li>Click &quot;Create New Webhook&quot;</li>
                            <li>Paste the webhook URL above</li>
                            <li>Select events to listen for (e.g., payment.captured)</li>
                            <li>Save and note the webhook secret</li>
                        </ol>
                    </div>

                    <div className='rounded-lg bg-muted p-4 space-y-2'>
                        <h4 className='font-medium text-sm'>Available Variables</h4>
                        <ul className='text-sm text-muted-foreground space-y-1'>
                            <li>
                                <code className='bg-background px-1 py-0.4 rounded'>
                                    {"{{razorpay.amount}}"}
                                </code>
                                - Payment amount (in paisa)
                            </li>
                            <li>
                                <code className='bg-background px-1 py-0.4 rounded'>
                                    {"{{razorpay.currency}}"}
                                </code>
                                - Currency code
                            </li>
                            <li>
                                <code className='bg-background px-1 py-0.4 rounded'>
                                    {"{{razorpay.orderId}}"}
                                </code>
                                - Order ID
                            </li>
                            <li>
                                <code className='bg-background px-1 py-0.4 rounded'>
                                    {"{{json razorpay}}"}
                                </code>
                                - Full event data as JSON
                            </li>
                            <li>
                                <code className='bg-background px-1 py-0.4 rounded'>
                                    {"{{razorpay.eventType}}"}
                                </code>
                                - Event type (e.g., payment.captured)
                            </li>
                        </ul>
                    </div>      
                </div>
            </DialogContent>
        </Dialog>
    );
};
