import { useEffect } from "react";
import { formatCurrency } from "@/utils/helpers";

import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import UpdateVariantForm from "./UpdateVariantForm";

function VariantRow({ variant, index, setVariants }) {
  const { size, price, quantity } = variant;

  useEffect(() => {
    console.log("variant", variant, "index", index);
  }, [variant, index]);

  const handleDeleteVariant = () => {
    setVariants((prevVariants) =>
      prevVariants.filter((_, variantIndex) => variantIndex !== index)
    );
  };

  return (
    <>
      <Table.Row>
        <div>{index + 1}</div>
        <div>{size}</div>
        <div>{formatCurrency(price)}</div>
        <div>{quantity}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={index} />
              <Menus.List id={index}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Xóa kích thước</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <UpdateVariantForm
                variantToEdit={variant}
                index={index}
                setVariants={setVariants}
              />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="Bạn có chắc chắn muốn xóa kích thước này?"
                onConfirm={handleDeleteVariant}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default VariantRow;
