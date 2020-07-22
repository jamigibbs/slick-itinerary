import React from 'react';
import ReactGA from 'react-ga';
import { isLocalHost } from './utils';
import { saveAs } from "file-saver";
import { pdf } from "@react-pdf/renderer";
import PDFItinerary from "./PDFItinerary";

const generatePDFDocument = async (title, lists, accentColor, headerImages, backgroundColor) => {
  const itinerary = <PDFItinerary title={title} lists={lists} accentColor={accentColor} headerImages={headerImages} backgroundColor={backgroundColor} />;
  const blobPdf = await pdf(itinerary);
  blobPdf.updateContainer(itinerary);
  const result = await blobPdf.toBlob();
  saveAs(result, `${title}.pdf`);

  if (!isLocalHost()) {
    ReactGA.event({
      category: 'User',
      action: 'Generated PDF',
      label: window.location.pathname
    });
  }
};

export default generatePDFDocument;