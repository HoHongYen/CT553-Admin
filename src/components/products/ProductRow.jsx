import { useNavigate } from "react-router-dom";

import { HiEye, HiStar, HiTrash } from "react-icons/hi2";

import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import RoundImage from "@/components/ui/RoundImage";
import { deleteProduct } from "@/services/apiProducts";
import { useDeleteProduct } from "@/hooks/products/useDeleteProduct";
import { formatDate } from "@/utils/helpers";
import { Rate } from "antd";
import Tag from "../ui/Tag";

function ProductRow({
  product: {
    id: productId,
    name,
    slug,
    productDiscount,
    createdAt,
    soldNumber,
    thumbnailImage,
    totalQuantity,
  },
}) {
  const { isDeleting, deleteProduct } = useDeleteProduct();

  const navigate = useNavigate();

  return (
    <Table.Row>
      <RoundImage path={thumbnailImage.path} alt={name} />
      <div>#{productId}</div>
      <div>{name}</div>
      <div>{formatDate(createdAt)}</div>
      <div>
        <Tag type={productDiscount.length > 0 ? "green" : "blue"}>
          {productDiscount.length > 0 ? "Đang giảm giá" : "Không có"}
        </Tag>
      </div>
      <div>{soldNumber}</div>
      <div>{totalQuantity}</div>
      <div className="flex gap-2 items-center">
        1
        <div className="text-yellow-600">
          <HiStar />
        </div>
      </div>
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
