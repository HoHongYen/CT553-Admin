import DashboardLayout from "@/components/layouts/DashboardLayout";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import { HiOutlineDownload } from "react-icons/hi";
import Button from "@/components/ui/Button";

function Dashboard() {
  const handlePrintReport = async () => {
    const pdf = new jsPDF();
    let imgWidth = pdf.internal.pageSize.getWidth();

    // const pdf = new jsPDF("p", "mm", "a4"); // A4 size page of PDF
    // const imgWidth = 208;
    const position = 0;

    let page1 = document.getElementById("page1");
    let page2 = document.getElementById("page2");
    const [imgPage1, imgPage2] = await Promise.all([
      html2canvas(page1),
      html2canvas(page2),
    ]);
    // Process first image
    let imgHeight = (imgPage1.height * imgWidth) / imgPage1.width;
    let contentDataURL = imgPage1.toDataURL("image/png");
    pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);
    pdf.addPage();
    // Process second image
    imgHeight = (imgPage2.height * imgWidth) / imgPage2.width;
    contentDataURL = imgPage2.toDataURL("image/png");
    pdf.addImage(contentDataURL, "PNG", 0, position, imgWidth, imgHeight);

    pdf.save("report.pdf"); // Generated PDF
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
