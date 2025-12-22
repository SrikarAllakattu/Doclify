"use client";

import { PDFDocument } from "pdf-lib";
import { useState } from "react";

export default function MergePdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");

  const handleMerge = async () => {
    if (files.length < 2) {
      setStatus("Please select at least 2 PDF files");
      return;
    }

    setStatus("Merging PDFs...");
    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const pdf = await PDFDocument.load(bytes);
      const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const mergedBytes = await mergedPdf.save();
    downloadFile(mergedBytes, "merged.pdf");
    setStatus("Merged PDF downloaded!");
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <h2>Merge PDF</h2>

      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files || []))}
      />

      <br /><br />

      <button onClick={handleMerge}>Merge PDFs</button>

      <p style={{ marginTop: "10px" }}>{status}</p>
    </div>
  );
}

function downloadFile(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
