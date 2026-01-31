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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export type HttpRequestFormValues = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  defaultValues?: Partial<HttpRequestFormValues>;
}

const formSchema = z.object({
  variableName: z
    .string()
    .min(1, "Variable name is required")
    .regex(/^[A-Za-z_$][A-Za-z0-9_$]*$/, {
      message: "Variable name must start with a letter or underscore and contain only letters, numbers, and underscores",
    }),
  endpoint: z.url({ message: "Please enter a valid URL" }),
  method: z.enum(["GET", "POST", "PUT", "PATCH", "DELETE"]),
  body: z.string().optional(),
  // .refine()
});

export type FormType = z.infer<typeof formSchema>;

export const HTTPRequestDialog = ({
  open,
  onOpenChange,
  onSubmit,
  defaultValues = {},
}: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({ // useForm is a hook from react-hook-form that manages form state and validation. state means the current values of the form fields.
    resolver: zodResolver(formSchema),
    defaultValues: {
      variableName: defaultValues.variableName || "", // default value for variableName field
      endpoint: defaultValues.endpoint || "",
      method: defaultValues.method || "GET",
      body: defaultValues.body || "",
    },
  });

  // explain this useEffect work? This effect resets the form values to the default values whenever the dialog is opened or the default values change. why when default values change? Whenever the dialog opens, the form is reset and pre-filled with defaultValues so it starts in a clean, correct state. It also resets when defaultValues change because when we open the dialog again, we want the current node data to be reflected in the form. When dialog opens OR when defaultValues change, Form is reset to current node data
  useEffect(() => { 
    if (open) {
      form.reset({
        variableName: defaultValues.variableName || "",
        endpoint: defaultValues.endpoint || "",
        method: defaultValues.method || "GET",
        body: defaultValues.body || "",
      });
    }
  }, [defaultValues, open, form]);

  const watchVariableName = form.watch("variableName"); // whats this for? It watches the variableName field for changes so the UI can react to those changes.

  const watchMethod = form.watch("method");
  const showBodyField = ["POST", "PUT", "PATCH"].includes(watchMethod); // only show body field for these methods. conditionally renders UI based on form state

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    onOpenChange(false);
  };



  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>HTTP Request</DialogTitle>
          <DialogDescription>Configure settings for the HTTP Request Node.</DialogDescription>
        </DialogHeader>
        <Form {...form}> 
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-4">
            <FormField
              control={form.control} // whats form.control? It provides access to the form's state and methods for managing individual fields.
              name="variableName"
              render={({ field }) => ( // what is field here? It contains properties and methods for managing the specific form field, such as value, onChange, onBlur, etc.
                <FormItem>
                  <FormLabel>Variable Name</FormLabel>
                  <FormDescription>
                   What you&apos;ll call the result in other nodes:&nbsp;
                    <code>{`{{ ${watchVariableName || "variableName"} }}`}</code>
                  </FormDescription>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endpoint"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endpoint</FormLabel>
                  <FormControl>
                    <Input placeholder="https://api.example.com/endpoint" {...field} />
                  </FormControl>
                  <FormDescription>
                    Static URL or use <code>{"{{variables}}"}</code> for simple values or <br/> <code>{"{{json variable}}"}</code> to stringify objects
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Method</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="GET">GET</SelectItem>
                      <SelectItem value="POST">POST</SelectItem>
                      <SelectItem value="PUT">PUT</SelectItem>
                      <SelectItem value="PATCH">PATCH</SelectItem>
                      <SelectItem value="DELETE">DELETE</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    The HTTP method to use
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showBodyField && ( // only show body field for POST, PUT, PATCH methods
              <FormField
                control={form.control}
                name="body"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Request Body</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={`Enter JSON request body:\n {\n \"userId\": \"{{httpResponse.data.id}}\",\n \"name\": \"{{httpResponse.data.name}}\",\n \"items\": \"{{json httpResponse.data.items}}\"\n}`}
                        className="min-h-[100px] p-2 text-sm font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      JSON with template variables. Use {"{{Variables}}"} for simple values or {"{{json variable}}"} to stringify objects
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter className="mt-4">
              <DialogClose className="mr-2 bg-accent p-2 rounded-md">Cancel</DialogClose>
              <Button type="submit" className="bg-primary p-2 rounded-md">Save</Button>
            </DialogFooter>
          </form> 
        </Form>
      </DialogContent>
    </Dialog>
  );
};
