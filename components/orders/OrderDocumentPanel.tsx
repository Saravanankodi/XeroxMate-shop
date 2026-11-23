"use client";

import { CheckCircle2, ChevronDown, FileImage, SlidersHorizontal } from "lucide-react";
import { useId, useState } from "react";

import Badge from "@/components/ui/Badge";
import IconTile from "@/components/ui/IconTile";
import { cn } from "@/lib/utils";
import type { OrderDocumentDetail } from "@/types/orders";

import DocumentPreview from "./DocumentPreview";
import PrintSpecification from "./PrintSpecification";

interface OrderDocumentPanelProps {
  documents: OrderDocumentDetail[];
}

export default function OrderDocumentPanel({
  documents,
}: OrderDocumentPanelProps) {
  const [selectedId, setSelectedId] = useState(
    documents[0]?.document.id ?? ""
  );
  const [specsOpen, setSpecsOpen] = useState(false);
  const specsPanelId = useId();

  const selected =
    documents.find((item) => item.document.id === selectedId) ?? documents[0];

  if (!selected) {
    return null;
  }

  const selectedNumber =
    documents.findIndex((item) => item.document.id === selected.document.id) + 1;

  function handleSelect(id: string) {
    setSelectedId(id);
    setSpecsOpen(true);
  }

  return (
    <section className="dashboard-card overflow-hidden">
      <div className="px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3">
          <div className="flex min-w-0 items-center gap-3">
            <IconTile icon={FileImage} size="sm" />

            <div className="min-w-0">
              <h2 className="font-heading text-base font-semibold leading-6 text-ink sm:text-[17px]">
                Document Details &amp; Job Preview
              </h2>

              <p className="mt-0.5 text-xs leading-4 text-muted">
                {documents.length} documents queued for production
              </p>
            </div>
          </div>

          <Badge tone="info" size="md">
            {documents.length} Documents
          </Badge>
        </div>

        <div className="pb-4">
          <DocumentPreview
            documents={documents}
            selectedId={selected.document.id}
            onSelect={handleSelect}
          />
        </div>
      </div>

      <div className="border-t border-line">
        <button
          type="button"
          onClick={() => setSpecsOpen((value) => !value)}
          aria-expanded={specsOpen}
          aria-controls={specsPanelId}
          className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition hover:bg-lilac/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand/30 sm:px-5"
        >
          <span className="flex min-w-0 items-center gap-3">
            <IconTile icon={SlidersHorizontal} size="sm" />

            <span className="min-w-0">
              <span className="flex flex-wrap items-center gap-2">
                <span className="font-heading text-base font-semibold leading-6 text-ink sm:text-[17px]">
                  Print Specification
                </span>

                <Badge tone="info">Document {selectedNumber}</Badge>
              </span>

              <span className="mt-0.5 block truncate text-xs leading-4 text-muted">
                {selected.document.fileName}
              </span>
            </span>
          </span>

          <span className="flex shrink-0 items-center gap-2">
            <Badge tone="neutral" size="md" className="text-muted">
              <CheckCircle2 size={12} className="text-brand-strong" />
              Verified Settings
            </Badge>

            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted transition-transform",
                specsOpen && "rotate-180"
              )}
              aria-hidden="true"
            />
          </span>
        </button>

        <div
          id={specsPanelId}
          hidden={!specsOpen}
          className="border-t border-line px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
        >
          <PrintSpecification specs={selected.specs} />
        </div>
      </div>
    </section>
  );
}
