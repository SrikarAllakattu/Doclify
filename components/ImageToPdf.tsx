"use client";

import { jsPDF } from "jspdf";
import { useState } from "react";

export default function ImageToPdf() {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");

  const handleConvert = async () => {
    if (files.length === 0) {
      setStatus("Please select images");
      return;
    }

    setStatus("Creating PDF...");
    const pdf = new jsPDF();

    for (let i = 0; i < files.length; i++) {
      const img = await loadImage(files[i]);
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const ratio = Math.min(
        pageWidth / img.width,
        pageHeight / img.height
      );

      const width = img.width * ratio;
      const height = img.height * ratio;

      const x = (pageWidth - width) / 2;
      const y = (pageHeight - height) / 2;

      if (i > 0) pdf.addPage();
      pdf.addImage(img, "JPEG", x, y, width, height);
    }

    pdf.save("images.pdf");
    setStatus("PDF downloaded!");
  };

  return (
  <div style={{ marginTop: "10px" }}>
    <input
      type="file"
      accept="image/*"
      multiple
      onChange={(e) => setFiles(Array.from(e.target.files || []))}
    />

    <br /><br />

    <button onClick={handleConvert}>
      Convert to PDF
    </button>

    <p style={{ marginTop: "10px" }}>{status}</p>
  </div>
);

}

function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}
