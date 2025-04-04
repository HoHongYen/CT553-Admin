import { Link } from "react-router-dom";
import { formatDateTimeFromNow } from "@/utils/helpers";
import { useHideReview } from "@/hooks/reviews/useHideReview";

import { HiEye, HiPencil, HiPlus, HiStar } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";
import Table from "@/components/ui/Table";
import Tag from "@/components/ui/Tag";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Menus from "@/components/ui/Menus";
import CommentItem from "./CommentItem";
import CreateReviewForm from "./CreateReviewForm";

function ReviewRow({ review }) {
  const {
    id: reviewId,
    orderId,
    productId,
    account: { fullName, id: accountId, avatar },
    rating,
    comment,
    reviewImage,
    orderDetail: {
      variant: {
        product: { name: productName },
      },
    },
    visible,
    replyByReview,
    createdAt,
  } = review;

  const { isLoading, toggleHideReview } = useHideReview();

  return (
    <>
      <Table.Row>
        <div>#{reviewId}</div>
        <Link to={`/don-hang/${orderId}`} className="font-bold underline">
          #{orderId}
        </Link>
        <div>{fullName}</div>
        <div>{productName}</div>
        <div>{formatDateTimeFromNow(createdAt)}</div>
        <div className="flex gap-2 items-center">
          {rating}
          <div className="text-[var(--color-yellow-700)] text-3xl">
            <HiStar />
          </div>
        </div>
        <div>
          {comment.length > 50 ? comment.slice(0, 50) + "..." : comment}
        </div>
        <Tag type={visible ? "green" : "red"}>
          {visible ? "Hiển thị" : "Đã ẩn"}
        </Tag>

        <Tag type={replyByReview.length > 0 ? "green" : "red"}>
          {replyByReview.length > 0 ? "Đã phản hồi" : "Chưa phản hồi"}
        </Tag>

        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={reviewId} />
              <Menus.List id={reviewId}>
                <Modal.Open opens="seeDetail">
                  <Menus.Button icon={<HiEye />}>Xem chi tiết</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="reply">
                  {review.replyByReview.length > 0 ? (
                    <Menus.Button icon={<HiEye />}>Xem phản hồi</Menus.Button>
                  ) : (
                    <Menus.Button icon={<HiPlus />}>Thêm phản hồi</Menus.Button>
                  )}
                </Modal.Open>

                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>
                    {visible ? "Ẩn" : "Hiển thị"} đánh giá
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="seeDetail">
              <CommentItem review={review} />
            </Modal.Window>

            <Modal.Window name="reply">
              {review.replyByReview.length > 0 ? (
                <CreateReviewForm
                  orderDetail={review.orderDetail}
                  replyToReview={review}
                  reviewToEdit={review.replyByReview[0]}
                />
              ) : (
                <CreateReviewForm
                  orderDetail={review.orderDetail}
                  replyToReview={review}
                />
              )}
            </Modal.Window>

            <Modal.Window name="edit">
              <ConfirmCertain
                resourceName={`Bạn có chắc chắn muốn ${
                  visible ? "ẩn" : "hiển thị"
                } đánh giá này?`}
                disabled={isLoading}
                onConfirm={() => toggleHideReview(reviewId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default ReviewRow;
