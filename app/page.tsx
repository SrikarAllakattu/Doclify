"use client";

import { useEffect, useState } from "react";

import ImageToPdf from "../components/ImageToPdf";
import MergePdfReorderSafe from "../components/MergePdfReorderSafe";
import SplitPdf from "../components/SplitPdf";
import ProtectPdf from "../components/ProtectPdf";
import PdfToImage from "../components/PdfToImage";

const TOOLS = [
  { id: "image-to-pdf", label: "🖼️ Image → PDF" },
  { id: "merge-pdf", label: "📎 Merge PDF" },
  { id: "split-pdf", label: "✂️ Split PDF" },
  { id: "protect-pdf", label: "🔒 Protect PDF" },
  { id: "pdf-to-image", label: "🔁 PDF → Image" },
];

export default function Home() {
  const [activeTool, setActiveTool] = useState("image-to-pdf");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveTool(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0,
      }
    );

    TOOLS.forEach((tool) => {
      const section = document.getElementById(tool.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="container">
      {/* HERO */}
      <div className="hero">
        <h1>allMYpdfs </h1>
<p>
  Fast, private, browser-based document tools.
  Convert, merge, split, and protect PDFs — all in your browser.
</p>

      </div>

      {/* STICKY HEADER WITH PILLS */}
      <div className="sticky-header">
        <div className="tool-pills">
          {TOOLS.map((tool) => (
            <a
              key={tool.id}
              href={`#${tool.id}`}
              className={`pill ${
                activeTool === tool.id ? "active" : ""
              }`}
            >
              {tool.label}
            </a>
          ))}
        </div>
      </div>

      {/* IMAGE TO PDF */}
      <div
        className="section"
        id="image-to-pdf"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="card">
          <h2>Image → PDF Converter</h2>
          <p>Convert JPG and PNG images into a clean PDF file.</p>
          <ImageToPdf />
        </div>
      </div>

      {/* MERGE PDF */}
      <div
        className="section"
        id="merge-pdf"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="card">
          <h2>Merge PDF (Reorder Pages)</h2>
          <p>Combine PDFs and reorder pages before merging.</p>
          <MergePdfReorderSafe />
        </div>
      </div>

      {/* SPLIT PDF */}
      <div
        className="section"
        id="split-pdf"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="card">
          <h2>✂️ Split PDF</h2>
          <p>Extract selected pages from a PDF.</p>
          <SplitPdf />
        </div>
      </div>

      {/* PROTECT PDF */}
      <div
        className="section"
        id="protect-pdf"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="card">
          <h2>🔒 Protect PDF</h2>
          <p>Secure your PDF with a password.</p>
          <ProtectPdf />
        </div>
      </div>

      {/* PDF TO IMAGE */}
      <div
        className="section"
        id="pdf-to-image"
        style={{ scrollMarginTop: "120px" }}
      >
        <div className="card">
          <h2>🔁 PDF → Image</h2>
          <p>Convert PDF pages into high-quality PNG images.</p>
          <PdfToImage />
        </div>
      </div>
    </div>
  );
}
