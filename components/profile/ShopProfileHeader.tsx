import { Check, ExternalLink, Save } from "lucide-react";

interface ShopProfileHeaderProps {
  dirty: boolean;
}

export default function ShopProfileHeader({
  dirty,
}: ShopProfileHeaderProps) {
  return (
    <header className="flex flex-col gap-4 pb-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="max-w-[576px]">
        <h1 className="font-heading text-[26px] font-bold leading-[34px] tracking-[-0.75px] text-navy sm:text-[30px] sm:leading-[38px]">
          Shop Profile & Location
        </h1>
        <p className="mt-1 text-sm leading-5 text-muted">
          Manage your storefront information, operating hours, banking
          details, and customer-facing photos.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <a
          href="#public-storefront"
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-white px-4 font-heading text-xs font-semibold leading-4 text-ink shadow-sm transition hover:bg-lilac"
        >
          <ExternalLink size={14} className="text-brand-strong" />
          View Public Storefront
        </a>

        <button
          type="submit"
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-navy px-5 font-heading text-xs font-semibold leading-4 text-white shadow-sm transition hover:bg-navy/90"
        >
          {dirty ? <Save size={14} /> : <Check size={14} />}
          {dirty ? "Save Changes" : "All Changes Saved"}
        </button>
      </div>
    </header>
  );
}
