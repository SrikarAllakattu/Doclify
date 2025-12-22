"use client";

import { useState } from "react";

declare global {
  interface Window {
    pdfjsLib: any;
  }
}

export default function PdfToImage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = async () => {
    if (!file || !window.pdfjsLib) return;

    setLoading(true);
    setStatus("Converting PDF to images...");

    window.pdfjsLib.GlobalWorkerOptions.workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

    const pdf = await window.pdfjsLib
      .getDocument(await file.arrayBuffer())
      .promise;

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 2 });

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({ canvasContext: ctx, viewport }).promise;

      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `page-${i}.png`;
      link.click();
    }

    setStatus("Images downloaded successfully!");
    setLoading(false);
  };

  return (
    <div>
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <button
        onClick={handleConvert}
        disabled={!file || loading}
        style={{ opacity: !file || loading ? 0.6 : 1 }}
      >
        {loading ? "Converting..." : "Convert to Images"}
      </button>

      {status && <p className="status">{status}</p>}
    </div>
  );
}
