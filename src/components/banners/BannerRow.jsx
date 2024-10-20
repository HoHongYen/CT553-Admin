// import { useDeleteBanner } from "@/hooks/banners/useDeleteBanner";

import { HiPencil, HiTrash } from "react-icons/hi2";
import { formatDate } from "@/utils/helpers";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import RoundImage from "@/components/ui/RoundImage";
import CreateBannerForm from "./CreateBannerForm";
import Tag from "../ui/Tag";

function BannerRow({ banner }) {
  // const { isDeleting, deleteBanner } = useDeleteBanner();

  const {
    id: bannerId,
    name,
    bannerCategory,
    image,
    priority,
    visible,
    createdAt,
  } = banner;

  return (
    <>
      <Table.Row>
        <img src={image.path} className="px-2 w-full" />
        <div>#{bannerId}</div>
        <div>{name}</div>
        <div>{bannerCategory.name}</div>
        <div>{priority}</div>
        <div>{formatDate(createdAt)}</div>
        <Tag type={visible ? "green" : "red"}>
          {visible ? "Hiển thị" : "Đã ẩn"}
        </Tag>
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={bannerId} />
              <Menus.List id={bannerId}>
                <Modal.Open opens="edit">
                  <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Xóa banner</Menus.Button>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit">
              <CreateBannerForm bannerToEdit={banner} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="Bạn có chắc chắn muốn xóa banner này?"
                // disabled={isDeleting}
                // onConfirm={() => deleteBanner(bannerId)}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
}

export default BannerRow;
