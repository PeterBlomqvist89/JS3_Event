'use client'

import { Button } from "@/components/ui/button"
import { db } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore"
import Link from "next/link"
import { useEffect, useState } from "react"

function LandingPage() {
  const [content, setContent] = useState({ title: '', description: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const docRef = doc(db, 'landingPageContent', 'SmtSJZhsEtgOrXbR2FDS');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContent(docSnap.data());
      }
      setIsLoading(false);
    };
    fetchContent();
  }, []);

  if (isLoading) {
    return (
      <main className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <>
      <main className="h-screen flex flex-col items-center justify-center text-center">
        <h1 className="lg:text-6xl font-bold font-mono sm:text-4xl">{content.title}</h1>
        <p className="lg:text-lg sm:text-sm mt-4 text-muted-foreground">{content.description}</p>
        <div className="flex gap-4 mt-20">
          <Button asChild className="bg-transparent text-current w-[180px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500">
            <Link href="/sign-up">Sign up</Link>
          </Button>
          <Button asChild className="bg-transparent text-current w-[180px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
      </main>
    </>
  );
}

export default LandingPage;
