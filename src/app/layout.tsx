import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { FaGithub } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Regular Expression to NFA Converter",
  description: "Web app to convert regular expression to NFA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <footer className="text-sm text-center py-4 space-y-2">
          <p>
            Made with 🩷 by{" "}
            <span className="text-blue-700">6410406860 (Non)</span>,{" "}
            <span className="text-blue-700">6410406711 (Toey)</span>,{" "}
            <span className="text-blue-700">6410406649 (Pam)</span> for{" "}
            <span className="text-blue-700">
              01418334(66-2) Compiler Techniques
            </span>
          </p>
          <p>
            <a
              href="https://github.com/Qu1etboy/regex-to-nfa"
              target="_blank"
              className="flex justify-center items-center gap-2 text-blue-700 hover:underline"
            >
              <FaGithub /> Source code
            </a>
          </p>
        </footer>
        <Toaster />
      </body>
    </html>
  );
}
