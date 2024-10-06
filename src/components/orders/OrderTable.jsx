import * as XLSX from "xlsx";
import { useOrders } from "@/hooks/orders/useOrders";
import { Skeleton } from "antd";
import { formatDate } from "@/utils/helpers";
import { HiOutlineDownload } from "react-icons/hi";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import OrderRow from "./OrderRow";
import Pagination from "../ui/Pagination";
import Button from "../ui/Button";
import {
  ORDER_STATUS_TEXT,
  PAYMENT_METHOD,
  PAYMENT_STATUS_TEXT,
} from "@/utils/constants";

function OrderTable() {
  const { isLoading, orders, totalOrders, totalPages } = useOrders();

  const handleDownloadExcel = () => {
    const rows = orders.map((order) => ({
      id: order.id,
      buyerId: order.buyer.id,
      buyerName: order.buyer.fullName,
      createdAt: formatDate(order.createdAt),
      finalPrice: order.finalPrice,
      paymentMethod: PAYMENT_METHOD[order.payment.paymentMethod.name],
      paymentStatus: PAYMENT_STATUS_TEXT[order.payment.paymentStatus.name],
      currentStatus: ORDER_STATUS_TEXT[order.currentStatus.name],
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    const colWidths = [
      { wch: 15 },
      { wch: 15 },
      { wch: 20 },
      { wch: 20 },
      { wch: 25 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Đơn hàng");

    // add header row

    XLSX.utils.sheet_add_aoa(worksheet, [["Danh sách đơn hàng"]], {
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
          "Mã đơn",
          "Mã khách hàng",
          "Tên khách hàng",
          "Ngày đặt hàng",
          "Tổng thanh toán",
          "Phương thức thanh toán",
          "Trạng thái thanh toán",
          "Trạng thái đơn hàng",
        ],
      ],
      { origin: "A2" }
    );

    XLSX.writeFile(workbook, "OrderReport.xlsx", { compression: false });
  };

  if (isLoading) return <Skeleton />;
  if (!orders.length) return <p>Không có đơn hàng nào!</p>;

  return (
    <Menus>
      <Table columns="0.5fr 0.5fr 1fr 1fr 1fr 1fr 2fr 1.5fr 2fr 1.5fr">
        <Table.Header>
          <div>Mã đơn</div>
          <div>Mã khách hàng</div>
          <div>Tên khách hàng</div>
          <div>Ngày đặt hàng</div>
          <div>Tổng thanh toán</div>
          <div>Phương thức thanh toán</div>
          <div>Trạng thái thanh toán</div>
          <div>Trạng thái đơn hàng</div>
          <div>Cập nhật trạng thái đơn hàng</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={orders}
          render={(order) => <OrderRow key={order.id} order={order} />}
        />
        <Table.Footer>
          <Pagination
            count={totalOrders}
            totalPages={totalPages}
            label="đơn hàng"
          />
        </Table.Footer>
      </Table>
      <div className="mt-5 flex gap-5 justify-end">
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

export default OrderTable;
