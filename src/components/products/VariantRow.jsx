import { HiPencil, HiTrash } from "react-icons/hi2";

import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import CreateVariantForm from "./CreateVariantForm";

function VariantRow({ variant, index, variants, setVariants }) {
  const { size, price, quantity } = variant;

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
        <div>{price}</div>
        <div>{quantity}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={index} />
              <Menus.List id={index}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Xem chi tiết</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Xóa kích thước</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CreateVariantForm
                variantToEdit={variant}
                index={index}
                setVariants={setVariants}
                variants={variants}
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
