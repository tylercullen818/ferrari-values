import Link from "next/link";

const footerLinks = {
  Market: [
    { label: "All Models", href: "/#models" },
    { label: "Compare", href: "/compare" },
    { label: "Legends & Hypercars", href: "/#models" },
    { label: "Classic V12 GTs", href: "/#models" },
    { label: "Modern V8", href: "/#models" },
  ],
  Resources: [
    { label: "Methodology", href: "#" },
    { label: "Market Report", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Disclaimer", href: "#" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-[#222] bg-[#0A0A0A]">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <div className="flex size-6 items-center justify-center rounded bg-[#DC0000]">
                <svg viewBox="0 0 24 24" className="size-4 text-white" fill="currentColor">
                  <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.18L18 8v8l-6 3.82L6 16V8l6-3.82z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-[#F5F5F0]">Cavallino Analytics</span>
            </Link>
            <p className="mt-3 text-xs text-[#888880] leading-relaxed">
              Independent Ferrari market intelligence. Values are estimates based on public auction data, dealer listings, and private sale reports.
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.1em] text-[#F5F5F0]">
                {category}
              </h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#888880] transition-colors hover:text-[#F5F5F0]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-[#222] pt-8 space-y-3">
          <p className="text-xs text-[#555]">
            Market data sourced from ExoticCarMarketplace.com, TheClassicValuer.com, and public auction records. Updated March 2026.
          </p>
          <p className="text-xs text-[#555]">
            &copy; 2026 Cavallino Analytics. All rights reserved. Not affiliated with Ferrari S.p.A. All values are estimates and should not be considered financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
