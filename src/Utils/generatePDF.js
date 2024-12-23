import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const generatePDF = async (elementToPrintId, fileName = "PaySlip") => {
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

  pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save(`${fileName}.pdf`); // Save with the given filename
};
