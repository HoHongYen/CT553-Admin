import { useDeleteCategory } from "@/hooks/categories/useDeleteCategory";

import { HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import RoundImage from "@/components/ui/RoundImage";
import CreateCategoryForm from "./CreateCategoryForm";

function CategoryRow({ category }) {
  const { isDeleting, deleteCategory } = useDeleteCategory();

  const { id: categoryId, name, thumbnailImage } = category;

  return (
    <>
      <Table.Row>
        <RoundImage path={thumbnailImage?.path} alt={name} />
        <div>#{categoryId}</div>
        <div>{name}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={categoryId} />
              <Menus.List id={categoryId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Xóa danh mục</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CreateCategoryForm categoryToEdit={category} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="Bạn có chắc chắn muốn xóa danh mục này?"
                disabled={isDeleting}
                onConfirm={() => deleteCategory(categoryId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default CategoryRow;
