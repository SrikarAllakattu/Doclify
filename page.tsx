import ImageToPdf from "../../components/ImageToPdf";

export const metadata = {
  title: "Image to PDF Converter – Free & Private Online Tool",
  description:
    "Convert images to PDF online for free. No uploads, no signup. JPG and PNG to PDF directly in your browser.",
};

export default function ImageToPdfPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
      <h1>Image to PDF Converter</h1>

      <p>
        Convert JPG, PNG, and other images into a single PDF file.
        Everything runs in your browser — your files never leave your device.
      </p>

      <ImageToPdf />

      <section style={{ marginTop: "40px" }}>
        <h2>Why use this Image to PDF tool?</h2>
        <ul>
          <li>✔ Free forever</li>
          <li>✔ No file uploads</li>
          <li>✔ Works offline after load</li>
          <li>✔ Secure & private</li>
        </ul>
      </section>
    </main>
  );
}
