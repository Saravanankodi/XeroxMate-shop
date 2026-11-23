import { ChevronRight, Download, Eye, FileImage, Printer } from "lucide-react";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { OrderDocumentDetail } from "@/types/orders";

interface DocumentPreviewProps {
  documents: OrderDocumentDetail[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function DocumentPreview({
  documents,
  selectedId,
  onSelect,
}: DocumentPreviewProps) {
  return (
    <div className="space-y-2">
      {documents.map(({ document }, index) => {
        const selected = document.id === selectedId;

        return (
          <button
            key={document.id}
            type="button"
            onClick={() => onSelect(document.id)}
            aria-pressed={selected}
            aria-label={`View print specification for ${document.fileName}`}
            className={cn(
              "flex w-full items-center gap-3 rounded-xl border p-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30",
              selected
                ? "border-brand bg-lilac-soft"
                : "border-line bg-lilac hover:bg-lilac-soft"
            )}
          >
            <span className="flex h-12 w-10 shrink-0 items-center justify-center rounded-lg bg-ink text-white">
              <FileImage size={20} />
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex flex-wrap items-center gap-2">
                <Badge tone="info">Document {index + 1}</Badge>

                {selected ? <Badge tone="success">Selected</Badge> : null}
              </span>

              <span className="mt-1 block truncate text-sm font-semibold text-ink">
                {document.fileName}
              </span>

              <span className="block text-xs text-muted">
                {document.kind} · {document.pages}{" "}
                {document.pages === 1 ? "Page" : "Pages"} · {document.size}
              </span>
            </span>

            <ChevronRight
              className={cn(
                "h-4 w-4 shrink-0 text-muted transition-transform",
                selected && "rotate-90"
              )}
              aria-hidden="true"
            />
          </button>
        );
      })}

      <div className="flex flex-wrap gap-2 pt-1">
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
          Print
        </Button>
      </div>
    </div>
  );
}
