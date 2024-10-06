import * as XLSX from "xlsx";
import { useReviews } from "@/hooks/reviews/useReviews";
import { formatDate } from "@/utils/helpers";
import { Skeleton } from "antd";
import { HiOutlineDownload } from "react-icons/hi";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import ReviewRow from "./ReviewRow";
import Pagination from "../ui/Pagination";
import Button from "../ui/Button";

function ReviewTable() {
  const { isLoading, reviews, totalReviews, totalPages } = useReviews();

  const handleDownloadExcel = () => {
    const rows = reviews.map((review) => ({
      id: review.id,
      orderId: review.orderId,
      accountName: review.account.fullName,
      productName: review.orderDetail.variant.product.name,
      createdAt: formatDate(review.createdAt),
      rating: review.rating,
      comment: review.comment,
      status: review.visible ? "Hiển thị" : "Đã ẩn",
      reply: review.replyByReview.length > 0 ? "Đã phản hồi" : "Chưa phản hồi",
    }));

    // create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(rows);

    const colWidths = [
      { wch: 10 },
      { wch: 10 },
      { wch: 25 },
      { wch: 40 },
      { wch: 15 },
      { wch: 10 },
      { wch: 40 },
      { wch: 20 },
      { wch: 20 },
    ];

    worksheet["!cols"] = colWidths;

    XLSX.utils.book_append_sheet(workbook, worksheet, "Đánh giá");

    // add header row

    XLSX.utils.sheet_add_aoa(worksheet, [["Danh sách đánh giá"]], {
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
          "Mã đánh giá",
          "Mã đơn",
          "Tên khách hàng",
          "Tên sản phẩm",
          "Thời gian",
          "Rating",
          "Nhận xét",
          "Trạng thái",
          "Phản hồi",
        ],
      ],
      { origin: "A2" }
    );

    XLSX.writeFile(workbook, "ReviewReport.xlsx", { compression: false });
  };

  if (isLoading) return <Skeleton />;
  if (!reviews.length) return <p>Không có đánh giá nào!</p>;

  return (
    <Menus>
      <Table columns="0.5fr 0.5fr 1fr 2fr 1fr 1fr 3fr 1fr 2fr 0.5fr">
        <Table.Header>
          <div>Mã đánh giá</div>
          <div>Mã đơn</div>
          <div>Tên khách hàng</div>
          <div>Tên sản phẩm</div>
          <div>Thời gian</div>
          <div>Rating</div>
          <div>Nhận xét</div>
          <div>Trạng thái</div>
          <div>Phản hồi</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={reviews}
          render={(review) => <ReviewRow key={review.id} review={review} />}
        />
        <Table.Footer>
          <Pagination
            count={totalReviews}
            totalPages={totalPages}
            label="đánh giá"
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

export default ReviewTable;
