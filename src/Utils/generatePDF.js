import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const generatePDF = async (
  elementToPrintId,
  fileName = "PaySlip",
  footerText = "*This is Computer generated pdf"
) => {
  const element = document.getElementById(elementToPrintId);

  if (!element) {
    alert(`Element with id ${elementToPrintId} not found`);
    return;
  }

  // Capture the element as an image
  const canvas = await html2canvas(element, { scale: 2 });
  const data = canvas.toDataURL("image/png");

  // Initialize PDF
  const pdf = new jsPDF({
    orientation: "portrait", // Use portrait mode
    unit: "mm",
    format: "a4", // Standard A4 size
  });

  const imgWidth = 210; // A4 width in mm
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  // Add the image to the PDF
  pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);

  // Add footer text at the bottom of the PDF
  const pageWidth = pdf.internal.pageSize.getWidth(); // Get page width
  const pageHeight = pdf.internal.pageSize.getHeight(); // Get page height

  pdf.setFontSize(10); // Set smaller font size
  pdf.text(footerText, pageWidth / 2, pageHeight - 10, { align: "center" }); // Center-align text

  // Save the PDF with the given filename
  pdf.save(`${fileName}.pdf`);
};
