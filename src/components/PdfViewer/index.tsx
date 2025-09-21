"use client";
import React, { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

interface PdfViewerProps {
  pdfUrl: string | Uint8Array; // signed URL do backend
  containerStyle?: React.CSSProperties;
  onReachEnd?: () => void; // callback quando chegar no fim
}

const PdfViewer: React.FC<PdfViewerProps> = ({
  pdfUrl,
  containerStyle,
  onReachEnd,
}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const [numPages, setNumPages] = useState(0);

  return (
    <div style={{ ...containerStyle }}>
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
        <Viewer
          fileUrl={pdfUrl}
          plugins={[defaultLayoutPluginInstance]}
          onDocumentLoad={(e) => {
            setNumPages(e.doc.numPages);
            if (e.doc.numPages === 1) {
              onReachEnd?.();
            }
          }}
          onPageChange={(e) => {
            if (e.currentPage === numPages - 1 && numPages > 1) {
              onReachEnd?.();
            }
          }}
        />
      </Worker>
    </div>
  );
};
export default PdfViewer;
