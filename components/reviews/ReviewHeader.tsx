import {
  Download,
  QrCode,
  ShieldCheck,
} from "lucide-react";

interface ReviewHeaderProps {
  onExport: () => void;
}

export default function ReviewHeader({
  onExport,
}: ReviewHeaderProps) {
  return (
    <header className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="max-w-[517px]">
        <h1 className="font-heading text-[30px] font-bold leading-[38px] tracking-[-0.75px] text-ink">
          Customer Feedback & Reviews
        </h1>

        <p className="mt-1 text-sm leading-5 text-muted">
          Monitor verified campus student reviews, reply to
          ratings, and maintain your Madurai West Hub quality
          tier.
        </p>
      </div>

      <div className="flex w-full flex-col gap-2 xl:w-[416px]">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-1 rounded-xl bg-white px-4 font-heading text-sm font-semibold leading-5 text-ink shadow-sm transition hover:bg-lilac"
          >
            <QrCode size={15} className="text-brand-strong" />
            Share Counter QR
          </button>

          <button
            type="button"
            onClick={onExport}
            className="inline-flex h-10 items-center gap-1 rounded-xl bg-white px-4 font-heading text-sm font-semibold leading-5 text-ink shadow-sm transition hover:bg-lilac"
          >
            <Download size={14} className="text-muted" />
            Export Reviews (CSV)
          </button>
        </div>

        <span className="inline-flex h-8 w-fit items-center gap-1.5 rounded-xl bg-[#00312C] px-4 text-[11px] font-semibold leading-[14px] text-white shadow-sm">
          <ShieldCheck size={17} className="text-mint" />
          100% Student Verified
        </span>
      </div>
    </header>
  );
}
