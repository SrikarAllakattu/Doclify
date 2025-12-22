"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function ProtectPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  const protect = async () => {
    if (!file || !password) return;

    const pdf = await PDFDocument.load(await file.arrayBuffer());
    pdf.encrypt({ userPassword: password, ownerPassword: password });

    const bytes = await pdf.save();
    download(bytes, "protected.pdf");
    setStatus("Password-protected PDF downloaded!");
  };

  return (
    <div>
      <input type="file" accept="application/pdf" onChange={e => setFile(e.target.files?.[0] || null)} />
      <input
        type="password"
        placeholder="Set password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ marginTop: "12px", width: "100%", padding: "12px", borderRadius: "12px" }}
      />
      <button onClick={protect}>Protect PDF</button>
      {status && <p className="status">{status}</p>}
    </div>
  );
}

function download(bytes: Uint8Array, name: string) {
  const blob = new Blob([bytes]);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}
