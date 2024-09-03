import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/helpers";
import Heading from "../ui/Heading";

function CreateVariantForm({ variantToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = variantToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;

  const [size, setSize] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  async function onSubmit({ name }, e) {
    e.preventDefault();

    // if (isEditSession)
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    setSize("");
    onCloseModal?.();
  }

  useEffect(() => {
    if (isEditSession) {
      setSize("");
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex justify-center">
        <Heading as="h2">Thêm thông tin kích thước tranh</Heading>
        </div>
        <FormRow label="Kích thước:" error={errors?.size?.message}>
          <Input
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
        <Button>
          {isEditSession ? "Lưu chỉnh sửa" : "Lưu thông tin kích thước"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateVariantForm;
