"use client";

import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2Icon } from "lucide-react";
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
import { authClient } from "@/lib/auth-client";

const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});
type LoginFormValues = z.infer<typeof loginSchema>;
export function LoginForm() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const signInGithub = async () => {
        setIsGithubLoading(true);
        await authClient.signIn.social({
            provider: "github",
            callbackURL: "/workflows",
        }, {
            onError: () => {
                toast.error('Something went wrong');
                setIsGithubLoading(false);
            },
        })
    };

    const signInGoogle = async () => {
        setIsGoogleLoading(true);
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/workflows",
        }, {
            onError: () => {
                toast.error('Something went wrong');
                setIsGoogleLoading(false);
            },
        })
    };
    const onSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/workflows",
        },
            {
                onSuccess: () => {
                    queryClient.clear();
                    router.refresh();
                    router.push("/workflows");
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
            });
    };
    const isPending = form.formState.isSubmitting;
    const anyLoading = isPending || isGithubLoading || isGoogleLoading;
    return (
        <div className="flex flex-col gap-6 mx-auto w-full">
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
                                        disabled={anyLoading}
                                        onClick={() => signInGithub()}
                                    >
                                        {isGithubLoading ? (
                                            <><Loader2Icon className="size-5 animate-spin" /> Signing in...</>
                                        ) : (
                                            <><Image src="/logos/github.svg" alt="GitHub" width={22} height={22} className="dark:invert" /> Continue with GitHub</>
                                        )}
                                    </Button>
                                    <Button variant="outline"
                                        className="w-full cursor-pointer"
                                        type="button"
                                        disabled={anyLoading}
                                        onClick={() => signInGoogle()}
                                    >
                                        {isGoogleLoading ? (
                                            <><Loader2Icon className="size-5 animate-spin" /> Signing in...</>
                                        ) : (
                                            <><Image src="/logos/google.svg" alt="Google" width={20} height={20} /> Continue with Google</>
                                        )}
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
                                                        placeholder="example@gmail.com"
                                                        className="border-2 border-muted-foreground/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" />

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
                                                        placeholder="*********"
                                                        className="border-2 border-muted-foreground/40 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit"
                                        disabled={anyLoading}
                                        className="w-full cursor-pointer"
                                    >
                                        {isPending ? (
                                            <><Loader2Icon className="size-5 animate-spin" /> Signing in...</>
                                        ) : "Login"}
                                    </Button>
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