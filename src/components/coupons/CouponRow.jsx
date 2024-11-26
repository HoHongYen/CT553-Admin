import { useDeleteCoupon } from "@/hooks/coupons/useDeleteCoupon";
import { formatCurrency, formatDate } from "@/utils/helpers";

import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import CreateCouponForm from "./CreateCouponForm";

function CouponRow({ coupon }) {
  const { isDeleting, deleteCoupon } = useDeleteCoupon();
  const {
    id: couponId,
    code,
    discountType,
    discountValue,
    quantity,
    collectedQuantity,
    startDate,
    endDate,
  } = coupon;

  return (
    <>
      <Table.Row>
        <div>{code}</div>
        <div>
          {discountType === "percentage"
            ? "Giảm theo phần trăm"
            : "Giảm theo số tiền"}
        </div>
        {discountType === "percentage" ? (
          <div>{discountValue}%</div>
        ) : (
          <div>{formatCurrency(discountValue)}</div>
        )}
        <div>{quantity}</div>
        <div>{collectedQuantity}</div>
        <div>{formatDate(startDate)}</div>
        <div>{formatDate(endDate)}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={couponId} />
              <Menus.List id={couponId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Xóa mã giảm giá</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CreateCouponForm couponToEdit={coupon} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="Bạn có chắc chắn muốn xóa mã giảm giá này?"
                disabled={isDeleting}
                onConfirm={() => deleteCoupon(couponId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CouponRow;
