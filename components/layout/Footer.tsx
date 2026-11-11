const policies = [
  "Data Privacy Policy",
  "Terms of Service",
  "Security Whitepaper",
  "Help Center",
];

export default function Footer() {
  return (
    <footer className="w-full shrink-0 border-t border-[#1e293b]/80 bg-[#060911] px-4 py-3">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#94a3b8] sm:text-sm">
          <span className="flex shrink-0 items-center gap-3">
            <span className="font-display text-base font-extrabold tracking-tight text-white sm:text-[17px]">
              XEROXMATE
            </span>

            <span className="text-[#475569]">|</span>
          </span>

          <span className="min-w-0 leading-5">
            © 2026 XeroxMate Network Inc. All rights reserved.
          </span>
        </div>

        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-[#94a3b8] sm:gap-x-6 sm:text-sm">
          {policies.map((policy) => (
            <a
              key={policy}
              href="#"
              className="transition hover:text-white"
            >
              {policy}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
