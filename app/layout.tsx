import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wayfare — Book tours & experiences",
  description: "Find and book guided tours and local experiences worldwide.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-plum-900/10 bg-sand-50/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="font-display text-2xl text-plum-900">
              Wayfare
            </Link>
            <nav className="hidden gap-8 text-sm text-plum-900/80 sm:flex">
              <Link href="/activities" className="hover:text-plum-900">
                Explore tours
              </Link>
              <Link href="/activities?category=Food+%26+Drink" className="hover:text-plum-900">
                Food tours
              </Link>
            </nav>
            <Link
              href="/activities"
              className="rounded-full bg-plum-900 px-5 py-2 text-sm font-medium text-sand-50 transition hover:bg-plum-800"
            >
              Find a tour
            </Link>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-plum-900/10 bg-plum-900 text-sand-100">
          <div className="mx-auto max-w-6xl px-6 py-10 text-sm">
            <p className="font-display text-lg text-sand-50">Wayfare</p>
            <p className="mt-2 max-w-md text-sand-100/70">
              A demo booking platform built for a portfolio project — sample
              data only, no real payments are processed.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
