import {
  Download,
  Eye,
  FileImage,
  Printer,
  ShieldCheck,
} from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import SectionCard from "@/components/ui/SectionCard";
import type { OrderDocument } from "@/types/orders";

interface DocumentPreviewProps {
  document: OrderDocument;
}

export default function DocumentPreview({
  document,
}: DocumentPreviewProps) {
  return (
    <SectionCard
      icon={FileImage}
      title="Document Ingest & Job Preview"
      subtitle="1 document queued for production"
      badge={
        <Badge tone="success">
          <ShieldCheck size={12} />
          Preflight Passed (300 DPI)
        </Badge>
      }
    >
      <div className="flex flex-col gap-3 rounded-xl bg-lilac p-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex h-14 w-11 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
            <FileImage size={22} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-[11px] font-bold uppercase tracking-wide text-navy">
              {document.kind}
              <span className="ml-2 font-medium normal-case tracking-normal text-muted">
                · {document.sheets}{" "}
                {document.sheets === 1 ? "Sheet" : "Sheets"}
              </span>
            </p>

            <p className="truncate text-sm font-semibold text-ink">
              {document.fileName}
            </p>

            <p className="text-xs text-muted">
              {document.pages}{" "}
              {document.pages === 1 ? "Page" : "Pages"} · {document.size}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Eye size={14} />
            Preview
          </Button>

          <Button variant="outline" size="sm">
            <Download size={14} />
            Raw
          </Button>

          <Button variant="primary" size="sm">
            <Printer size={14} />
            Spooler
          </Button>
        </div>
      </div>
    </SectionCard>
  );
}
