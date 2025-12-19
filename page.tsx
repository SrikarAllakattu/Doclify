import MergePdfReorderSafe from "../../components/MergePdfReorderSafe";

export const metadata = {
  title: "Merge PDF Online – Reorder Pages Before Merging",
  description:
    "Merge PDF files online and reorder individual pages before merging. Free, private, and browser-based.",
};

export default function MergePdfPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Merge PDF (Reorder Pages)</h1>

      <p>
        Combine multiple PDFs into one file. Reorder individual pages
        before merging to get the exact final document you want.
      </p>

      <MergePdfReorderSafe />

      <section style={{ marginTop: "40px" }}>
        <h2>Features</h2>
        <ul>
          <li>✔ Page-level reordering</li>
          <li>✔ No uploads to servers</li>
          <li>✔ Free & unlimited</li>
          <li>✔ Works entirely in browser</li>
        </ul>
      </section>
    </main>
  );
}
