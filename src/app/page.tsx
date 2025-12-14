
import { LogoutButton } from "@/components/logout-button";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

export default async function Home() {
  await requireAuth(); // Ensure the user is authenticated before rendering the page, server-side session check and secure route

  // const {data} = authClient.useSession(); // useSession is used to check if user is logged in
  const data = await caller.getUsers();
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      {JSON.stringify(data)}
      {data && <LogoutButton />}
    </div>
  );
}
