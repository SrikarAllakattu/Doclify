"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function SplitPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [range, setRange] = useState("");
  const [status, setStatus] = useState("");

  const handleSplit = async () => {
    if (!file || !range) return;

    const srcPdf = await PDFDocument.load(await file.arrayBuffer());
    const pages = range.split(",").flatMap(part => {
      if (part.includes("-")) {
        const [s, e] = part.split("-").map(n => parseInt(n));
        return Array.from({ length: e - s + 1 }, (_, i) => s + i - 1);
      }
      return [parseInt(part) - 1];
    });

    const newPdf = await PDFDocument.create();
    const copied = await newPdf.copyPages(srcPdf, pages);
    copied.forEach(p => newPdf.addPage(p));

    const bytes = await newPdf.save();
    download(bytes, "split.pdf");
    setStatus("Split PDF downloaded!");
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
      <input
        type="text"
        placeholder="Pages (e.g. 1-3,5)"
        value={range}
        onChange={e => setRange(e.target.value)}
        style={{ marginTop: "12px", width: "100%", padding: "12px", borderRadius: "12px" }}
      />
      <button onClick={handleSplit}>Split PDF</button>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

function download(bytes: Uint8Array, name: string) {
  const blob = new Blob(
    [bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)],
    { type: "application/pdf" }
  );

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


