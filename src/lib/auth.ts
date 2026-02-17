import { betterAuth } from "better-auth"; 
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { polar, checkout, portal } from "@polar-sh/better-auth";
import { polarClient } from "./polar";

let authInstance: ReturnType<typeof betterAuth> | null = null;

const getAuth = () => {
  if (!authInstance) {
    authInstance = betterAuth({ 
      database: prismaAdapter(prisma, 
        { 
          provider: "postgresql", 
        }), 
        emailAndPassword:{
          enabled: true,
          autoSignIn: true // automatic sigIn after signUp
        },
        socialProviders: {
            github: { 
                clientId: process.env.GITHUB_CLIENT_ID as string, 
                clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
            }, 
            google: { 
                clientId: process.env.GOOGLE_CLIENT_ID as string, 
                clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
            }, 
        },
        plugins: [
            polar({
                client: polarClient,
                createCustomerOnSignUp: true,
                use: [
                    checkout({
                        products: [
                            {
                                productId: "3c619a29-6f2e-4e84-a242-2f7c49bea6e8",
                                slug: "CogniFlow-Pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/CogniFlow-Pro
                            }
                        ],
                        successUrl: process.env.POLAR_SUCCESS_URL,
                        authenticatedUsersOnly: true
                    }),
                    portal(),  
                ],
            })
        ]
    });
  }
  return authInstance;
};

export const auth = new Proxy({} as ReturnType<typeof betterAuth>, {
  get: (target, prop) => {
    const instance = getAuth();
    return instance[prop as keyof typeof instance];
  }
});