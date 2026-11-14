import Link from "next/link";
import { site } from "@/lib/site";

const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8 sm:py-6">
      <Link href="/" className="font-serif text-lg sm:text-2xl">
        {site.name}
      </Link>
      <nav aria-label="Main">
        <ul className="flex gap-4 text-sm text-ink-muted sm:gap-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-block py-3 transition-colors hover:text-ink"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
