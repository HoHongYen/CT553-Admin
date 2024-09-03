import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import Heading from "../ui/Heading";
import Textarea from "../ui/Textarea";
import toast from "react-hot-toast";

function CreateVariantForm({
  index = null,
  variantToEdit = {},
  onCloseModal,
  setVariants,
  variants,
}) {
  const isEditSession = index !== null;

  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isEditSession ? variantToEdit : {},
  });
  const { errors } = formState;

  async function onSubmit({ size, price, quantity }, e) {
    e.preventDefault();
    if (isEditSession) {
      setVariants((prevVariants) =>
        prevVariants.map((variant, idx) =>
          idx === index ? { size, price, quantity } : variant
        )
      );
      toast.success("Cập nhật kích thước thành công!");
      onCloseModal?.();
    } else {
      if (variants.some((variant) => variant.size === size)) {
        toast.error("Kích thước đã tồn tại!");
        return;
      }
      setVariants((prevVariants) => [
        ...prevVariants,
        { size, price, quantity },
      ]);
      toast.success("Thêm kích thước thành công!");
      reset();
    }
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    onCloseModal?.();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex justify-center">
          <Heading as="h2">Thêm thông tin kích thước tranh</Heading>
        </div>
        <FormRow label="Kích thước:" error={errors?.size?.message}>
          <Textarea
            type="text"
            id="size"
            {...register("size", {
              required: "Không được để trống",
            })}
          />
        </FormRow>
        <FormRow label="Giá (VNĐ):" error={errors?.price?.message}>
          <Input
            type="number"
            id="price"
            {...register("price", {
              required: "Không được để trống",
              min: {
                value: 1000,
                message: "Giá không được nhỏ hơn 1.000 VNĐ",
              },
            })}
          />
        </FormRow>
        <FormRow label="Số lượng:" error={errors?.quantity?.message}>
          <Input
            type="number"
            id="quantity"
            {...register("quantity", {
              required: "Không được để trống",
              min: {
                value: 0,
                message: "Số lượng không được nhỏ hơn 0",
              },
            })}
          />
        </FormRow>
      </div>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleCancel}>
          Hủy
        </Button>
        <Button>{isEditSession ? "Lưu chỉnh sửa" : "Lưu kích thước"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateVariantForm;
