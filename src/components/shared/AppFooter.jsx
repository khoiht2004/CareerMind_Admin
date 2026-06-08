import { Mail, MoveRight } from "lucide-react";

const footerLinks = [
  {
    title: "For Candidates",
    links: [
      { label: "Browse jobs", href: "#" },
      { label: "Browse companies", href: "#" },
      { label: "Application status", href: "#" },
      { label: "Career tips", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "About CareerMind", href: "#" },
      { label: "Help center", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "Terms of service", href: "#" },
    ],
  },
];

function FooterLink({ href, children }) {
  return (
    <a
      href={href}
      className="group text-muted-foreground hover:text-foreground inline-flex w-fit items-center gap-1 text-sm transition-colors"
    >
      <span className="relative">
        {children}
        <span className="bg-foreground/60 absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-200 group-hover:w-full" />
      </span>
    </a>
  );
}

function SocialButton({ label }) {
  return (
    <button
      type="button"
      className="bg-background text-muted-foreground hover:border-foreground/20 hover:bg-muted hover:text-foreground focus-visible:ring-ring cursor-pointer rounded-lg border px-3 py-1 text-xs shadow-sm transition-all hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:outline-none"
      aria-label={label}
    >
      {label}
    </button>
  );
}

export default function AppFooter() {
  return (
    <footer className="border-t bg-(--footer-app)">
      <div className="w-full py-6">
        <div className="grid grid-cols-1 gap-8 px-4 sm:px-6 lg:grid-cols-3 lg:gap-10">
          {/* Column 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="bg-muted grid size-10 place-items-center rounded-md border text-sm font-semibold">
                CM
              </div>
              <div className="leading-tight">
                <div className="text-md font-semibold tracking-tight">
                  CareerMind
                </div>
                <div className="text-muted-foreground text-xs">
                  Hire smarter. Apply faster.
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm">
              A clean, focused hiring workspace for candidates and recruiters —
              jobs, companies, and applications in one place.
            </p>

            <div className="flex flex-wrap gap-2">
              <SocialButton label="Facebook" />
              <SocialButton label="LinkedIn" />
              <SocialButton label="GitHub" />
            </div>
          </div>

          {/* Column 2 */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-6 xl:gap-15">
            {footerLinks.map((col) => (
              <div key={col.title} className="space-y-3">
                <div className="text-md font-semibold">{col.title}</div>
                <div className="flex flex-col gap-2">
                  {col.links.map((l) => (
                    <FooterLink key={l.label} href={l.href}>
                      {l.label}
                    </FooterLink>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <div className="text-md font-semibold">Easy update</div>
            <p className="text-muted-foreground text-sm">
              Subscribe to product updates — no spam, unsubscribe anytime.
            </p>

            <form
              className="flex flex-col gap-2 sm:flex-row sm:items-center"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="bg-background focus-within:ring-ring flex min-w-0 flex-1 items-center gap-2 rounded-xl border px-3 py-2 shadow-sm focus-within:ring-2">
                <Mail className="text-muted-foreground size-4 shrink-0" />
                <input
                  type="email"
                  placeholder="Your email"
                  className="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
                />
              </div>

              <button
                type="submit"
                className="group bg-primary text-primary-foreground focus-visible:ring-ring inline-flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-110 focus-visible:ring-2 focus-visible:outline-none sm:w-auto"
              >
                <span>Send</span>
                <MoveRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-10 flex flex-col gap-3 border-t px-4 pt-6 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="text-muted-foreground text-xs">
            © {new Date().getFullYear()} CareerMind. All rights reserved.
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <FooterLink href="#">Privacy policy</FooterLink>
            <FooterLink href="#">Terms</FooterLink>
            <FooterLink href="#">Code of conduct</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
