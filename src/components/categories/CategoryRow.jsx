import styled from "styled-components";
import { HiLockClosed, HiPencil } from "react-icons/hi2";

import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import RoundImage from "@/components/ui/RoundImage";

function CategoryRow({ category }) {
  // const { isDeleting, deleteCabin } = useDeleteCabin();

  const {
    id: categoryId,
    name, 
    thumbnailImage,
  } = category;

  return (
    <>
      <Table.Row>
        <RoundImage path={thumbnailImage?.path} alt={name} />
        <div>{categoryId}</div>
        <div>{name}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={categoryId} />
              <Menus.List id={categoryId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Xem chi tiết</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiLockClosed />}>
                    Xóa danh mục
                  </Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              {/* <CreateCabinForm cabinToEdit={user} /> */}
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="categories"
                // disabled={isDeleting}
                // onConfirm={() => deleteCabin(userId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CategoryRow;
