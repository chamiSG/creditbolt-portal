import { getServerAuthSession } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import SessionProvider from "./provider/SessionProvider";
import { redirect } from "next/navigation";
import { Header } from "./_components/header";
import { Dashboard } from "@/app/_components/dashboard";

export default async function Home() {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/signin");
  }

  return (
    <SessionProvider session={session}>
      <HydrateClient>
        <main className="main min-h-screen">
          <Header />
          <Dashboard />
        </main>
      </HydrateClient>
    </SessionProvider>
  );
}