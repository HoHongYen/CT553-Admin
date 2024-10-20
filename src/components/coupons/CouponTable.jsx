import * as XLSX from "xlsx";
import { useCoupons } from "@/hooks/coupons/useCoupons";
import { Skeleton } from "antd";
import { HiOutlineDownload } from "react-icons/hi";
import { formatCurrency, formatDate } from "@/utils/helpers";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import CouponRow from "./CouponRow";
import Button from "../ui/Button";
import AddCoupon from "./AddCoupon";

function CouponTable() {
  const { isLoading, coupons } = useCoupons();

  const handleDownloadExcel = () => {
    const rows = coupons.map((coupon) => ({
      code: coupon.code,
      discountType:
        coupon.discountType === "percentage"
          ? "Giảm theo phần trăm"
          : "Giảm theo số tiền",
      discountValue: formatCurrency(coupon.discountValue),
      quantity: coupon.quantity,
      collectedQuantity: coupon.collectedQuantity,
      startDate: formatDate(coupon.startDate),
      endDate: formatDate(coupon.endDate),
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    const colWidths = [
      { wch: 15 },
      { wch: 30 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Coupons");

    // add header row

    XLSX.utils.sheet_add_aoa(worksheet, [["Danh sách coupons"]], {
      origin: "A1",
    });

    worksheet["!merges"] = [
      { s: { r: 0, c: 0 }, e: { r: 0, c: colWidths.length - 1 } },
    ];

    // customize header names
    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        [
          "Mã coupon",
          "Loại giảm giá",
          "Giá trị giảm",
          "Số lượng",
          "Đã thu thập",
          "Ngày bắt đầu",
          "Ngày kết thúc",
        ],
      ],
      { origin: "A2" }
    );

    XLSX.writeFile(workbook, "CouponReport.xlsx", { compression: false });
  };

  if (isLoading) return <Skeleton />;
  if (!coupons.length)
    return (
      <p>
        Không có coupon nào!
        <div className="mt-5 flex gap-5 justify-end">
          <AddCoupon />
        </div>
      </p>
    );

  return (
    <Menus>
      <Table columns="1fr 1.5fr 1fr 1fr 1fr 1fr 1fr 0.5fr">
        <Table.Header>
          <div>Mã coupon</div>
          <div>Loại giảm giá</div>
          <div>Giá trị giảm</div>
          <div>Số lượng</div>
          <div>Đã thu thập</div>
          <div>Ngày bắt đầu</div>
          <div>Ngày kết thúc</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={coupons}
          render={(coupon) => <CouponRow key={coupon.id} coupon={coupon} />}
        />
      </Table>
      <div className="mt-5 flex gap-5 justify-end">
        <AddCoupon />
        <Button
          variation="success"
          className="flex items-center gap-2"
          onClick={handleDownloadExcel}
        >
          <HiOutlineDownload size={14} />
          Tải file excel
        </Button>
      </div>
    </Menus>
  );
}

export default CouponTable;
