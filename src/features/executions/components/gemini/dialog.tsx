"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, { message: "Variable name is required" })
    .regex (/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message: "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores",
    }),
  systemPrompt: z.string().optional(),
  userPrompt: z.string().min(1, "User prompt is required"),
});

export type GeminiFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<GeminiFormValues>;
}

export const GeminiDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({ // useForm is a hook from react-hook-form that manages form state and validation. state means the current values of the form fields.
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "", // default value for variableName field
      systemPrompt: defaultValues.systemPrompt || "",
      userPrompt: defaultValues.userPrompt || "",
    },
  });

  // explain this useEffect work? This effect resets the form values to the default values whenever the dialog is opened or the default values change. why when default values change? Whenever the dialog opens, the form is reset and pre-filled with defaultValues so it starts in a clean, correct state. It also resets when defaultValues change because when we open the dialog again, we want the current node data to be reflected in the form. When dialog opens OR when defaultValues change, Form is reset to current node data
  useEffect(() => { 
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "", // default value for variableName field
        systemPrompt: defaultValues.systemPrompt || "",
        userPrompt: defaultValues.userPrompt || "",
      });
    }
  }, [defaultValues, open, form]);

  const watchVariableName = form.watch("variableName"); // whats this for? It watches the variableName field for changes so the UI can react to those changes.

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Gemini Configuration</DialogTitle>
          <DialogDescription>Configure the AI Model and the prompts for this node.</DialogDescription>
        </DialogHeader>
        <Form {...form}> 
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6 mt-4 pr-2">
            <FormField
              control={form.control} // whats form.control? It provides access to the form's state and methods for managing individual fields.
              name="variableName"
              render={({ field }) => ( // what is field here? It contains properties and methods for managing the specific form field, such as value, onChange, onBlur, etc.
                
                <FormItem>
                  <FormLabel>Variable Name</FormLabel>
                  <FormDescription className="text-xs sm:text-sm break-words">
                    Use this name to reference the result in
                    other nodes:{" "}
                    {`{{${watchVariableName || "name"}.text}}`}
                  </FormDescription>
                  <FormControl>
                    <Input 
                      placeholder="name"
                      className="text-xs sm:text-sm"
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

              <FormField
                control={form.control}
                name="systemPrompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>System Prompt (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="You are a helpful assistant."
                        className="min-h-[80px] p-2 text-xs sm:text-sm font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Sets the behavior of the assistant. Use {"{{variables}}"} for simple values or {"{{json variable}}"} to stringify objects
                  </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userPrompt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>User Prompt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Summarize the following text: {{json httpResponse.data}}"
                        className="min-h-[120px] p-2 text-xs sm:text-sm font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The prompt that will be sent to Gemini. Use {"{{variables}}"} for simple values or {"{{json variable}}"} to stringify objects from the context.
                  </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <DialogFooter className="mt-4 flex-col sm:flex-row gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline" className="w-full sm:w-auto">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="w-full sm:w-auto">Save</Button>
            </DialogFooter>
          </form> 
        </Form>
      </DialogContent>
    </Dialog>
  );
};
