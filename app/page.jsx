'use client'

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

function LandingPage() {
 
  return (
    <>
    <main className="backgroundImage">
      <div className=" h-screen flex flex-col items-center justify-center text-center ">
        <Image 
        src="/images/logo.png" 
        width={300}
        height={300}
        alt="logo" 
         />
        <h1 className="text-8xl font-bold text-white ">Event Horizon</h1>
        <p className="text-2xl  text-white  mt-4 text-muted-foreground">Your Gateway to Unforgettable Events</p>
        <div className="flex gap-4 mt-20">
          <Button asChild className="bg-transparent text-white  w-[180px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500">
            <Link href="/sign-up">Sign up</Link>
          </Button>
          <Button asChild className="bg-transparent text-white  w-[180px] h-12 rounded-full font-semibold hover:bg-blue-500 border-2 border-blue-500">
            <Link href="/sign-in">Sign in</Link>
          </Button>
        </div>
        <Image className="mt-12" 
        src="/images/logo2.png" 
        width={100}
        height={100}
        alt="logo" 
         />
      </div>
      
    </main>
    </>
  );
}

export default LandingPage;
