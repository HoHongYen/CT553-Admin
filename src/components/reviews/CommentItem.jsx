import { formatDateTimeFromNow } from "@/utils/helpers";
import { Rate } from "antd";
import RoundImage from "@/components/ui/RoundImage";
import Form from "../ui/Form";
import Heading from "../ui/Heading";
import FormRow from "../ui/FormRow";
import Button from "../ui/Button";

function CommentItem({ review, onCloseModal, toggleHideReview }) {
  return (
    <Form>
      <div className="w-[50vw] flex flex-col gap-5 pt-5 justify-center ">
        <div className="flex justify-center">
          <Heading as="h2">Chi tiết đánh giá</Heading>
        </div>
        <div className="my-5 pb-5">
          <div className="flex justify-between">
            <div className="flex gap-3">
              <RoundImage
                path={review.account.avatar?.path || "/default-user.jpg"}
              />
              <div className="flex flex-col">
                <div className="font-bold">{review.account.fullName}</div>
                <Rate disabled allowHalf value={review.rating} />
              </div>
            </div>
            <span className="text-2xl text-[var(--color-grey-400)]">
              {formatDateTimeFromNow(review.createdAt)}
            </span>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="flex gap-3">
                <span className="italic font-semibold">Nhận xét:</span>
                <span className="text-[var(--color-grey-400)]">
                  {review.comment}
                </span>
              </div>
              {review.reviewImage.length > 0 && (
                <div className="flex flex-col gap-3">
                  <span className="italic font-semibold">Hình ảnh:</span>

                  <div className="flex gap-2">
                    {review.reviewImage.map((item, index) => (
                      <div
                        onClick={() => setScaleImage(item.image)}
                        key={item.image.path}
                        className="flex gap-8 h-[25vh] max-w-[40vw]"
                      >
                        <div className="relative overflow-hidden border border-[var(--color-grey-300)] ">
                          <img
                            src={item.image.path}
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FormRow>
        <Button
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Đóng
        </Button>
      </FormRow>
    </Form>
  );
}

export default CommentItem;
