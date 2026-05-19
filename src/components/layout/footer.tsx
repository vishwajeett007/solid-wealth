import Link from "next/link";

const footerLinks = ["Privacy", "Terms", "Security", "Cookies"];

export function Footer() {
  return (
    <footer className="border-t border-wealth-border bg-wealth-surface px-5 py-12 sm:px-8 lg:px-20">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
        <div>
          <Link
            className="font-display text-lg font-extrabold text-wealth-primary"
            style={{ fontFamily: "var(--font-righteous)" }}
            href="/"
          >
            Solid Wealth
          </Link>
          <p className="mt-1 text-xs text-wealth-muted">
            Copyright 2026 Solid Wealth - Atmospheric Minimalism in Wealth
            Management
          </p>
        </div>

        <div className="flex flex-wrap gap-6 sm:gap-8">
          {footerLinks.map((link) => (
            <Link
              className="text-sm text-wealth-muted transition hover:text-wealth-accent"
              href="#"
              key={link}
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
