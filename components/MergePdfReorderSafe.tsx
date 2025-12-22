"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import {
  DndContext,
  closestCenter
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

type PageItem = {
  id: string;
  file: File;
  pageIndex: number;
  label: string;
};

export default function MergePdfReorderSafe() {
  const [pages, setPages] = useState<PageItem[]>([]);
  const [status, setStatus] = useState("");

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;

    const items: PageItem[] = [];

    for (const file of Array.from(files)) {
      const pdf = await PDFDocument.load(await file.arrayBuffer());
      const count = pdf.getPageCount();

      for (let i = 0; i < count; i++) {
        items.push({
          id: `${file.name}-${i}-${Math.random()}`,
          file,
          pageIndex: i,
          label: `${file.name} – Page ${i + 1}`,
        });
      }
    }

    setPages(items);
    setStatus("");
  };

  const handleMerge = async () => {
    if (!pages.length) return;

    setStatus("Merging PDF...");
    const merged = await PDFDocument.create();

    for (const p of pages) {
      const src = await PDFDocument.load(await p.file.arrayBuffer());
      const [page] = await merged.copyPages(src, [p.pageIndex]);
      merged.addPage(page);
    }

    const bytes = await merged.save();
    download(bytes, "merged-custom-order.pdf");
    setStatus("Merged PDF downloaded!");
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={(e) => handleFiles(e.target.files)}
      />

      <div style={{ marginTop: "15px" }}>
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={(e) => {
            const { active, over } = e;
            if (over && active.id !== over.id) {
              setPages((items) => {
                const oldIndex = items.findIndex(i => i.id === active.id);
                const newIndex = items.findIndex(i => i.id === over.id);
                const updated = [...items];
                const [moved] = updated.splice(oldIndex, 1);
                updated.splice(newIndex, 0, moved);
                return updated;
              });
            }
          }}
        >
          <SortableContext
            items={pages.map(p => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {pages.map(p => (
              <SortableItem key={p.id} id={p.id} label={p.label} />
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {pages.length > 0 && (
        <button style={{ marginTop: "15px" }} onClick={handleMerge}>
          Merge with This Order
        </button>
      )}

{status && <p className="status">{status}</p>}
    </div>
  );
}

function SortableItem({ id, label }: { id: string; label: string }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="sort-item"
      style={style}
      {...attributes}
      {...listeners}
    >
      {label}
    </div>
  );
}

function download(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
