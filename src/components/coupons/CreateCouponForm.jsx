import { useState } from "react";
import { useForm } from "react-hook-form";
import { useCreateCoupon } from "@/hooks/coupons/useCreateCoupon";
import { useUpdateCoupon } from "@/hooks/coupons/useUpdateCoupon";

import { DISCOUNT_TYPES } from "@/utils/constants";

import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Form from "@/components/ui/Form";
import FormRow from "@/components/ui/FormRow";
import Input from "@/components/ui/Input";
import Heading from "@/components/ui/Heading";
import TickRoundIcon from "../icons/TickRoundIcon";
import EmptyRoundBoxIcon from "../icons/EmptyRoundBoxIcon";

function CreateCouponForm({ couponToEdit = {}, onCloseModal }) {
  const { createCoupon, isLoading: isCreating } = useCreateCoupon();
  const { updateCoupon, isLoading: isUpdating } = useUpdateCoupon();
  const { id: editId, startDate, endDate, ...editValues } = couponToEdit;
  const isEditSession = Boolean(editId);
  const isWorking = isCreating || isUpdating;

  const { register, handleSubmit, formState, setValue, reset } = useForm({
    defaultValues: isEditSession
      ? {
          startDate: startDate.slice(0, 10),
          endDate: endDate.slice(0, 10),
          ...editValues,
        }
      : {},
  });
  const { errors } = formState;

  const options = DISCOUNT_TYPES.map((type) => ({
    value: type,
    label: type === "percentage" ? "Giảm theo phần trăm" : "Giảm theo số tiền",
  }));

  const [discountType, setDiscountType] = useState(!isEditSession ? DISCOUNT_TYPES[0] : editValues.discountType);
  const [discountTypeError, setDiscountTypeError] = useState("");

  const [visible, setVisible] = useState(!isEditSession ? true : editValues.visible);

  async function onSubmit({
    code,
    discountValue,
    minimumPriceToUse,
    quantity,
    startDate,
    endDate,
  }) {
    if (!discountType) {
      setDiscountTypeError("Không được để trống");
      return;
    }
    // Call API to create a new coupon

    if (isEditSession) {
      updateCoupon(
        {
          couponId: editId,
          updatedCoupon: {
            code,
            discountType,
            discountValue: Number.parseFloat(discountValue),
            minimumPriceToUse: Number.parseFloat(minimumPriceToUse),
            quantity: Number.parseInt(quantity),
            startDate,
            endDate,
            visible,
          },
        },
        {
          onSuccess: () => {
            onCloseModal?.();
          },
        }
      );
    } else {
      createCoupon(
        {
          code,
          discountType,
          discountValue: Number.parseFloat(discountValue),
          minimumPriceToUse: Number.parseFloat(minimumPriceToUse),
          quantity: Number.parseInt(quantity),
          startDate,
          endDate,
          visible,
        },
        {
          onSuccess: () => {
            reset();
            setDiscountType(DISCOUNT_TYPES[0]);
            setVisible(true);
            onCloseModal?.();
          },
        }
      );
    }
  }

  async function handleCancel() {
    // khong can e.preventDefault() vi day la button type="reset"
    onCloseModal?.();
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-5">
        <div className="flex justify-center">
          <Heading as="h2">Thêm coupon</Heading>
        </div>

        <FormRow size="medium" label="Mã coupon:" error={errors?.code?.message}>
          <Input
            type="text"
            id="code"
            disabled={isWorking}
            {...register("code", {
              required: "Không được để trống",
            })}
            onChange={(e) => setValue("code", e.target.value.toUpperCase())}
          />
        </FormRow>

        <FormRow size="medium" label="Loại giảm giá:" error={discountTypeError}>
          <Select
            options={options}
            value={discountType}
            onChange={(e) => {
              setDiscountType(e.target.value);
              setDiscountTypeError("");
              setValue("discountValue", 0);
            }}
            disabled={isWorking}
          />
        </FormRow>

        <FormRow
          size="medium"
          label={`Giá trị giảm ${
            discountType === "percentage" ? "(%)" : "(VND)"
          } :`}
          error={errors?.discountValue?.message}
        >
          <Input
            type="number"
            id="discountValue"
            disabled={isWorking}
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

        <FormRow
          size="medium"
          label="Giá tối thiểu để sử dụng (VND):"
          error={errors?.minimumPriceToUse?.message}
        >
          <Input
            type="number"
            id="minimumPriceToUse"
            disabled={isWorking}
            {...register("minimumPriceToUse", {
              required: "Không được để trống",
              min: {
                value: 1,
                message: "Giá tối thiểu phải lớn hơn 0",
              },
            })}
          />
        </FormRow>

        <FormRow
          size="medium"
          label="Ngày bắt đầu:"
          error={errors?.startDate?.message}
        >
          <Input
            type="date"
            id="startDate"
            disabled={isWorking}
            {...register("startDate", {
              required: "Không được để trống",
            })}
          />
        </FormRow>

        <FormRow
          size="medium"
          label="Ngày kết thúc:"
          error={errors?.endDate?.message}
        >
          <Input
            type="date"
            id="endDate"
            disabled={isWorking}
            {...register("endDate", {
              required: "Không được để trống",
            })}
          />
        </FormRow>

        <FormRow
          size="medium"
          label="Số lượng coupon:"
          error={errors?.quantity?.message}
        >
          <Input
            type="number"
            id="quantity"
            disabled={isWorking}
            {...register("quantity", {
              required: "Không được để trống",
              min: {
                value: 1,
                message: "Số lượng coupon phải lớn hơn 0",
              },
            })}
          />
        </FormRow>

        <FormRow size="medium" label="Trạng thái:">
          <div id="visible" className="flex items-center justify-between px-4">
            <div
              className="flex items-center gap-5 cursor-pointer"
              onClick={() => setVisible(true)}
            >
              <div className="max-w-6">
                {visible ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
              </div>
              <span>Hiển thị</span>
            </div>
            <div
              className="flex items-center gap-5 cursor-pointer"
              onClick={() => setVisible(false)}
            >
              <div className="max-w-6">
                {!visible ? <TickRoundIcon /> : <EmptyRoundBoxIcon />}
              </div>
              <span>Đã ẩn</span>
            </div>
          </div>
        </FormRow>
      </div>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          onClick={handleCancel}
          disabled={isWorking}
        >
          Hủy
        </Button>
        <Button
          disabled={isWorking}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit)();
          }}
        >
          Lưu coupon
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCouponForm;
