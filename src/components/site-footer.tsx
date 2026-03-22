import Link from "next/link";

const footerLinks = {
  Market: [
    { label: "All Models", href: "/#models" },
    { label: "Compare", href: "/compare" },
    { label: "Legends", href: "/#models" },
    { label: "Classics", href: "/#models" },
  ],
  Resources: [
    { label: "Methodology", href: "#" },
    { label: "Market Report", href: "#" },
    { label: "Newsletter", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Disclaimer", href: "#" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-[#DC0000]">
                <svg viewBox="0 0 24 24" className="size-4 text-white" fill="currentColor">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18L18 8v8l-6 3.82L6 16V8l6-3.82z" />
                </svg>
              </div>
              <span className="text-sm font-bold">Cavallino Analytics</span>
            </Link>
            <p className="mt-3 text-xs text-muted-foreground leading-relaxed">
              Independent Ferrari market intelligence. Values are estimates based on public auction data, dealer listings, and private sale reports.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            &copy; 2026 Cavallino Analytics. All rights reserved. Not affiliated with Ferrari S.p.A. All values are estimates and should not be considered financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
