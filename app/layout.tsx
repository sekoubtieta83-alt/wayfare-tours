import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wayfare Ghana — Tours & experiences across Ghana",
  description:
    "Book guided tours and local experiences across Ghana, directly with Ghanaian operators.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body flex min-h-screen flex-col">
        <header className="sticky top-0 z-40 border-b border-ink-900/10 bg-cream-50/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-baseline gap-2">
              <span className="font-display text-2xl text-forest-900">
                Wayfare
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-kente-500">
                Ghana
              </span>
            </Link>
            <nav className="hidden gap-8 text-sm text-ink-700 sm:flex">
              <Link href="/activities" className="hover:text-forest-900">
                Explore tours
              </Link>
              <Link
                href="/activities?category=Food+%26+Drink"
                className="hover:text-forest-900"
              >
                Food tours
              </Link>
              <Link
                href="/activities?category=History+%26+Heritage"
                className="hover:text-forest-900"
              >
                Heritage
              </Link>
            </nav>
            <Link
              href="/activities"
              className="rounded-full bg-forest-800 px-5 py-2 text-sm font-medium text-cream-50 transition hover:bg-forest-900"
            >
              Find a tour
            </Link>
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="border-t border-ink-900/10 bg-forest-900 text-cream-100">
          <div className="mx-auto max-w-6xl px-6 py-12">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-xl text-cream-50">Wayfare</span>
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-kente-300">
                Ghana
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm text-cream-100/65">
              A marketplace for Ghanaian tour operators and the travelers
              looking for them. Demo build — no real payments are processed yet.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
