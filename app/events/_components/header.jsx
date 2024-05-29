'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { signOut } from "firebase/auth"
import { auth } from "@/firebase/config"

const Header = () => {
  return (
    <nav>
    <ul className="flex justify-between items-center bg-slate-800 py-8 px-4">
        <Link href="/" className="font-semibold font-mono text-white ">Event-Maker</Link>
        <div className="flex gap-4 items-center">
        <li className="flex justify-center items-center">
            <Link className="text-white px-4 font-semibold font-mono hover:text-blue-800" href="/admin">Event List</Link>
            <Link  className="text-white px-4 font-semibold font-mono hover:text-blue-800" href="/admin/controll">Admin</Link>
            <Button variant="outlineWhite" className="bg-transparent border-white text-white font-semibold hover:text-white hover:bg-blue-800 rounded-full" onClick={async () => {
              await signOut(auth)
            }} >Sign out</Button>
        </li>
            <ModeToggle className="" />
        </div>
    </ul>
</nav>
  )
}
export default Header