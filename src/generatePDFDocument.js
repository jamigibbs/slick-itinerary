import React from 'react';
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import PDFItinerary from "./PDFItinerary";

const generatePDFDocument = async (title, lists, accentColor, headerImages, backgroundColor) => {
  const itinerary = <PDFItinerary title={title} lists={lists} accentColor={accentColor} headerImages={headerImages} backgroundColor={backgroundColor} />;
  const blobPdf = await pdf(itinerary);
  blobPdf.updateContainer(itinerary);
  const result = await blobPdf.toBlob();
  saveAs(result, `${title}.pdf`);
};

export default generatePDFDocument;