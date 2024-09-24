import { useNavigate } from "react-router-dom";

import { HiEye, HiTrash } from "react-icons/hi2";

import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import RoundImage from "@/components/ui/RoundImage";
import { deleteProduct } from "@/services/apiProducts";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import { formatDate } from "@/utils/helpers";

function ProductRow({
  product: { id: productId, name, slug, createdAt, soldNumber, thumbnailImage },
}) {
  const { isDeleting, deleteProduct } = useDeleteProduct();

  const navigate = useNavigate();

  return (
    <Table.Row>
      <RoundImage path={thumbnailImage.path} alt={name} />
      <div>#{productId}</div>
      <div>{name}</div>
      <div>{formatDate(createdAt)}</div>
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
                resourceName="Bạn có chắc chắn muốn xóa sản phẩm này?"
                disabled={isDeleting}
                onConfirm={() => deleteProduct(productId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default ProductRow;
