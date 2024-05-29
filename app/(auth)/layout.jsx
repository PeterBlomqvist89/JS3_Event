'use client';

import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

function AuthLayout({ children }) {
  const router = useRouter();
  const { user, authLoaded } = useAuth();

  useEffect(() => {
    if (authLoaded && user) {
      router.push('/events');
    }
  }, [authLoaded, user, router]);

  if (!authLoaded) return null;

  return (
    <div className="h-screen flex justify-center">
      {children}
    </div>
  );
}

export default AuthLayout;