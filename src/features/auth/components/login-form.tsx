"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import zod, {z} from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});
type LoginFormValues = z.infer<typeof loginSchema>;
export function LoginForm() {
  const router = useRouter(); // to navigate after login
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema), // resolver means it will use zod to validate
    defaultValues: {
      email: "",
      password: "",
    },
  });
    const onSubmit = async (values: LoginFormValues) => {
    console.log(values);
  };
  const isPending = form.formState.isSubmitting;
  return (
        <div className="flex flex-col gap-6 mx-auto min-w-sm">
            <Card>
                <CardHeader className="text-center">
                    <CardTitle>Welcome back</CardTitle>
                    <CardDescription>Login to continue</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="flex flex-col gap-4">
                                    <Button variant="outline"
                                        className="w-full cursor-pointer"
                                        type="button"
                                        disabled={isPending}
                                        // onClick={() => handleSocialLogin("github")}
                                    >
                                        <Image src="/logos/github.svg" alt="GitHub" width={22} height={22} />
                                        Continue with GitHub
                                    </Button>
                                    <Button variant="outline"
                                        className="w-full cursor-pointer"
                                        type="button"
                                        disabled={isPending}
                                        // onClick={() => handleSocialLogin("google")}
                                    >
                                        <Image src="/logos/google.svg" alt="Google" width={20} height={20} />
                                        Continue with Google
                                    </Button>
                                </div>
                                <div className="grid gap-6 w-full">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field}
                                                        type="email"
                                                        placeholder="example@gmail.com" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input {...field}
                                                        type="password"
                                                        placeholder="*********" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit"
                                        disabled={isPending}
                                        className="w-full cursor-pointer"
                                    >Login</Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link href="/signup" className="underline underline-offset-4">Sign Up</Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};