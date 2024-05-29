'use client'

import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./_components/header";
import Footer from "./_components/footer";

function EventsLayout({ children }) {
  const router = useRouter();
  const { user, authLoaded } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [authLoaded, user, router]);

  if (!authLoaded) return null;

return (
  <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-grow">
      {children}
        </main>
      <Footer />
  </div>
  )
}
export default EventsLayout