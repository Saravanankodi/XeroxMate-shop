import { Camera } from "lucide-react";

interface UploadPlaceholderProps {
  label: string;
  onUpload: () => void;
}

export default function UploadPlaceholder({
  label,
  onUpload,
}: UploadPlaceholderProps) {
  return (
    <div className="flex h-[259px] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-icon-soft bg-lilac/50 text-center">
      <Camera size={30} className="text-brand-strong" />
      <p className="text-xs font-semibold text-ink">
        Upload {label}
      </p>
      <p className="text-[11px] font-semibold text-muted">
        JPG or PNG · Max 10 MB
      </p>

      <button
        type="button"
        onClick={onUpload}
        className="mt-1 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-ink shadow-sm transition hover:bg-lilac"
      >
        Choose file
      </button>
    </div>
  );
}
