"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const {data} = authClient.useSession(); // useSession is used to check if user is logged in
  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      {JSON.stringify(data)}
      {data && (
        <Button onClick={()=> authClient.signOut()}>
          Logout
        </Button>
      )}
    </div>
  );
}
