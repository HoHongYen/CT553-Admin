// import { useDeleteBannerCategory } from "@/hooks/bannerCategorys/useDeleteBannerCategory";

import { HiPencil, HiTrash } from "react-icons/hi2";
import { formatDate } from "@/utils/helpers";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import RoundImage from "@/components/ui/RoundImage";
import CreateBannerCategoryForm from "./CreateBannerCategoryForm";

function BannerCategoryRow({ bannerCategory }) {
  // const { isDeleting, deleteBannerCategory } = useDeleteBannerCategory();

  const { id: bannerCategoryId, name, createdAt } = bannerCategory;

  return (
    <>
      <Table.Row>
        <div>#{bannerCategoryId}</div>
        <div>{name}</div>
        <div>{formatDate(createdAt)}</div>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={bannerCategoryId} />
              <Menus.List id={bannerCategoryId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Xóa danh mục banner</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CreateBannerCategoryForm bannerCategoryToEdit={bannerCategory} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="Bạn có chắc chắn muốn xóa bannerCategory này?"
                // disabled={isDeleting}
                // onConfirm={() => deleteBannerCategory(bannerCategoryId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default BannerCategoryRow;
