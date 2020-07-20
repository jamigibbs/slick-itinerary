import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Itinerary from'./Itinerary';

const PDFDownload = () => (
  <div>
    <PDFDownloadLink
        document={Itinerary}
        fileName="itinerary.pdf"
        style={{
            textDecoration: "none",
            padding: "10px",
            color: "#4a4a4a",
            backgroundColor: "#f2f2f2",
            border: "1px solid #4a4a4a"
        }}
      >
      {({ blob, url, loading, error }) =>
          // loading ? "Loading document..." : "Download Pdf"
          "Download Pdf"
      }
    </PDFDownloadLink>
  </div>
);

export default PDFDownload;