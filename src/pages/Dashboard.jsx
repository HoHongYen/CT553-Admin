import DashboardLayout from "@/components/layouts/DashboardLayout";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { HiOutlineDownload } from "react-icons/hi";
import Button from "@/components/ui/Button";

function Dashboard() {
  const handlePrintReport = async () => {
    const pdf = new jsPDF();
    const imgWidth = 210; // A4 width in mm
    const position = 0; // Starting position for the image

    try {
      // Capture the elements using html2canvas
      const [canvasPage1, canvasPage2] = await Promise.all([
        html2canvas(document.getElementById("page1")),
        html2canvas(document.getElementById("page2")),
      ]);

      // Convert canvas to data URL
      const imgPage1DataURL = canvasPage1.toDataURL("image/png");
      const imgPage2DataURL = canvasPage2.toDataURL("image/png");

      // Calculate image height to maintain aspect ratio
      const imgPage1Height =
        (canvasPage1.height * imgWidth) / canvasPage1.width;
      const imgPage2Height =
        (canvasPage2.height * imgWidth) / canvasPage2.width;

      // Add the first image to the PDF
      pdf.addImage(
        imgPage1DataURL,
        "PNG",
        0,
        position,
        imgWidth,
        imgPage1Height
      );
      pdf.addPage();

      // Add the second image to the PDF
      pdf.addImage(
        imgPage2DataURL,
        "PNG",
        0,
        position,
        imgWidth,
        imgPage2Height
      );

      // Save the PDF
      pdf.save("report.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <>
      <DashboardLayout />
      <div className="flex gap-5 justify-end">
        <Button
          variation="success"
          className="flex items-center gap-2"
          onClick={handlePrintReport}
        >
          <HiOutlineDownload size={14} />
          Tải file PDF
        </Button>
      </div>
    </>
  );
}

export default Dashboard;
