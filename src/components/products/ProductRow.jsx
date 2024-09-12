import { useNavigate } from "react-router-dom";

import { HiEye, HiTrash } from "react-icons/hi2";

import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import RoundImage from "@/components/ui/RoundImage";

function ProductRow({
  product: {
    id: productId,
    name,
    slug,
    createdAt,
    soldNumber,
    thumbnailImage,
  },
}) {
  const navigate = useNavigate();
  // const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <Table.Row>
      <RoundImage path={thumbnailImage.path} alt={name} />
      <div>{productId}</div>
      <div>{name}</div>
      <div>{createdAt}</div>
      <div>{soldNumber}</div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={productId} />
            <Menus.List id={productId}>
              <Menus.Button
                icon={<HiEye />}
                onClick={() => navigate(`/san-pham/${slug}`)}
              >
                Xem chi tiết
              </Menus.Button>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Xóa sản phẩm</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="delete">
              <ConfirmCertain
                resourceName="booking"
                // disabled={isDeleting}
                // onConfirm={() => deleteBooking(bookingId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ProductRow;
