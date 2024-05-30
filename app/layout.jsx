

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Event Horizon",
  description: "Your Gateway to Unforgettable Events",
};


export default function RootLayout({ children }) {
  return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <AuthContextProvider>
                        <Toaster />
                        {children}
          </AuthContextProvider>
        </body>
      </html>
  );
}