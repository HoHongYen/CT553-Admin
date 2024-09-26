import { useReviews } from "@/hooks/reviews/useReviews";
import { Skeleton } from "antd";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import ReviewRow from "./ReviewRow";
import Pagination from "../ui/Pagination";

function ReviewTable() {
  const { isLoading, reviews, totalReviews, totalPages } = useReviews();

  if (isLoading) return <Skeleton />;
  if (!reviews.length) return <p>Không có đánh giá nào!</p>;

  return (
    <Menus>
      <Table columns="0.5fr 0.5fr 1fr 2fr 1fr 1fr 3fr 1fr 1.5fr 1fr">
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
    </Menus>
  );
}

export default ReviewTable;
