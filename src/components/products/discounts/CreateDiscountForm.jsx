import { useState } from "react";
import { useForm } from "react-hook-form";

import { DISCOUNT_TYPES } from "@/utils/constants";

import toast from "react-hot-toast";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";

function CreateDiscountForm({ setDiscounts, onCloseModal }) {
  const { register, handleSubmit, formState, reset, setValue } = useForm();
  const { errors } = formState;

  const options = DISCOUNT_TYPES.map((type) => ({
    value: type,
    label: type === "percentage" ? "Giảm theo phần trăm" : "Giảm theo số tiền",
  }));

  const [discountType, setDiscountType] = useState(DISCOUNT_TYPES[0]);
  const [discountTypeError, setDiscountTypeError] = useState("");

  async function onSubmit({ discountValue, startDate, endDate }) {
    if (!discountType) {
      setDiscountTypeError("Không được để trống");
      return;
    }

    setDiscounts((prevDiscounts) => [
      ...prevDiscounts,
      {
        discountType,
        discountValue: Number.parseFloat(discountValue),
        startDate,
        endDate,
      },
    ]);
    toast.success("Thêm chương trình giảm giá thành công!");
    onCloseModal?.();
    reset();
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    onCloseModal?.();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex justify-center">
          <Heading as="h2">Thêm chương trình giảm giá</Heading>
        </div>

        <FormRow label="Loại giảm giá:" error={discountTypeError}>
          <Select
            options={options}
            value={discountType}
            onChange={(e) => {
              setDiscountType(e.target.value);
              setDiscountTypeError("");
              setValue("discountValue", 0);
            }}
          />
        </FormRow>

        <FormRow
          label={`Giá trị giảm ${
            discountType === "percentage" ? "(%)" : "(VND)"
          } :`}
          error={errors?.discountValue?.message}
        >
          <Input
            type="number"
            id="discountValue"
            {...register("discountValue", {
              required: "Không được để trống",
              min: {
                value: 1,
                message: "Giá trị giảm giá phải lớn hơn 0",
              },
              max: {
                value: discountType === "percentage" ? 100 : Infinity,
                message: `Giá trị giảm giá không được lớn hơn ${
                  discountType === "percentage" ? "100" : "vô cực"
                }`,
              },
            })}
          />
        </FormRow>

        <FormRow label="Ngày bắt đầu:" error={errors?.startDate?.message}>
          <Input
            type="date"
            id="startDate"
            {...register("startDate", {
              required: "Không được để trống",
            })}
          />
        </FormRow>

        <FormRow label="Ngày kết thúc:" error={errors?.endDate?.message}>
          <Input
            type="date"
            id="endDate"
            {...register("endDate", {
              required: "Không được để trống",
            })}
          />
        </FormRow>
      </div>
      <FormRow>
        <Button type="reset" variation="secondary" onClick={handleCancel}>
          Hủy
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}
        >
          Lưu giảm giá
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateDiscountForm;
