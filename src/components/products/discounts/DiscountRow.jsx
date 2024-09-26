import { useEffect } from "react";
import { formatCurrency } from "@/utils/helpers";

import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import UpdateDiscountForm from "./UpdateDiscountForm";

function DiscountRow({ discount, index, setDiscounts }) {
  const { discountType, discountValue, startDate, endDate } = discount;

  useEffect(() => {
    console.log("discount", discount, "index", index);
  }, [discount, index]);

  const handleDeleteDiscount = () => {
    setDiscounts((prevDiscounts) =>
      prevDiscounts.filter((_, discountIndex) => discountIndex !== index)
    );
  };

  return (
    <>
      <Table.Row>
        <div>{index + 1}</div>
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
        <div>{startDate}</div>
        <div>{endDate}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={index} />
              <Menus.List id={index}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Xóa giảm giá</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <UpdateDiscountForm
                discountToEdit={discount}
                index={index}
                setDiscounts={setDiscounts}
              />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="Bạn có chắc chắn muốn xóa chương trình giảm giá này?"
                onConfirm={handleDeleteDiscount}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default DiscountRow;
