import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { uploadImage, uploadImages } from "@/services/apiUpload";
import {
  deleteImage,
  uploadImage as uploadReviewImage,
} from "@/services/apiReviews";
import { useCreateReview } from "@/hooks/reviews/useCreateReview";
import { useUpdateReview } from "@/hooks/reviews/useUpdateReview";

import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Textarea from "@/components/ui/Textarea";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Heading from "@/components/ui/Heading";
import SpinnerMini from "@/components/ui/SpinnerMini";
import UploadReviewImage from "./UploadReviewImage";

function CreateReviewForm({
  orderDetail,
  replyToReview = {},
  reviewToEdit = {},
  onCloseModal,
}) {
  const { handleSubmit } = useForm();
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const [commentError, setCommentError] = useState("");

  const { isLoading: isCreating, createReview } = useCreateReview();
  const { isLoading: isUpdating, updateReview } = useUpdateReview();
  const isEditSession = Boolean(reviewToEdit.id);
  const isWorking = isCreating || isUpdating || isUploadingImage;

  useEffect(() => {
    console.log("reviewToEdit", reviewToEdit);
    console.log("isEditSession", isEditSession);

    if (isEditSession) {
      setComment(reviewToEdit.comment);

      setImages(
        reviewToEdit.reviewImage.map((image) => ({
          id: image.id, // id nay la id cua reviewImage
          path: image.image.path,
        }))
      );

      setOldImages(
        reviewToEdit.reviewImage.map((image) => ({
          id: image.id,
          path: image.image.path,
        }))
      );
    }
  }, [reviewToEdit]);

  function checkIfHasNoChange() {
    if (comment !== reviewToEdit.comment) return false;

    if (images.length !== oldImages.length) return false;

    for (let i = 0; i < images.length; i++) {
      if (images[i].path !== reviewToEdit?.reviewImage[i].image.path)
        return false;
    }
  }

  const handleUpdateReviewImages = async () => {
    console.log("images", images);
    console.log("oldImages", oldImages);

    const newImageArrayIds = [];
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      if (image.path.startsWith("blob")) {
        setIsUploadingImage(true);
        // upload new image
        const form = new FormData();
        console.log("-> new image", image);
        form.append("image", image.file);
        const res = await uploadImage(form);
        console.log("res", res.metadata.id);
        const uploadedReviewImage = await uploadReviewImage(reviewToEdit?.id, {
          uploadedImageId: res.metadata.id,
        });
        console.log("uploadedReviewImageId", uploadedReviewImage.metadata.id);
        newImageArrayIds.push(uploadedReviewImage.metadata.id);
      } else {
        console.log("image exist", image);
        newImageArrayIds.push(image.id);
      }
    }

    // delete old images
    for (let i = 0; i < oldImages.length; i++) {
      const oldImage = oldImages[i];
      if (!images.find((image) => image.path === oldImage.path)) {
        // delete image
        await deleteImage(oldImage.id);
      }
    }

    setIsUploadingImage(false);
    return newImageArrayIds;
  };

  async function onSubmit(data, e) {
    e.preventDefault();
    console.log("comment", comment);

    const uploadedImageIds = await handleUploadReviewImages();

    console.log("uploadedImageIds", uploadedImageIds);

    if (!comment) {
      setCommentError("Vui lòng nhập nhận xét!");
      return;
    }

    if (isEditSession) {
      if (checkIfHasNoChange()) {
        toast.error("Không có thay đổi nào được thực hiện!");
        return;
      }

      const uploadedReviewImageIds = await handleUpdateReviewImages();
      console.log("uploadedReviewImageIds", uploadedReviewImageIds);

      updateReview(
        {
          reviewId: reviewToEdit.id,
          updatedReview: {
            comment,
            uploadedImageIds,
          },
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      createReview(
        {
          orderId: orderDetail.orderId,
          variantId: orderDetail.variant.id,
          productId: orderDetail.variant.product.id,
          comment,
          replyToReviewId: replyToReview.id,
          uploadedImageIds: uploadedImageIds,
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    }
  }

  const handleUploadReviewImages = async () => {
    const form = new FormData();
    images.forEach((image) => {
      form.append("images", image.file);
    });
    try {
      setIsUploadingImage(true);
      const res = await uploadImages(form);
      const idArray = res.metadata.map((item) => item.id);
      return idArray;
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  useEffect(() => {
    if (comment) setCommentError("");
  }, [comment]);

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <div className="flex justify-center mb-10">
        <Heading as="h2">
          {isEditSession ? "Chỉnh sửa phản hồi" : "Viết phản hồi"}
        </Heading>
      </div>

      {/* <FormRow> */}
      <div className="mt-8">
        <div className="flex gap-5 pb-5">
          <label className="font-[700] text-[1.5rem] required">Phản hồi:</label>
        </div>
        <Textarea
          maxLength={500}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          label="Nhận xét"
          placeholder="Thêm phản hồi"
          required
        />
      </div>
      <span className="text-[1.4rem] text-[var(--color-red-700)]">
        {commentError}
      </span>
      {/* </FormRow> */}

      <UploadReviewImage
        images={images}
        setImages={setImages}
        isUploadingImage={isUploadingImage}
      />

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
          disabled={isWorking}
        >
          Hủy
        </Button>
        <Button disabled={isWorking}>
          {!isWorking ? (
            isEditSession ? (
              "Lưu phản hồi"
            ) : (
              "Gửi phản hồi"
            )
          ) : (
            <SpinnerMini />
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateReviewForm;
