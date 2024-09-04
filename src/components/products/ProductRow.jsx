import styled from "styled-components";
import { format, isToday } from "date-fns";
import { formatCurrency } from "@/utils/helpers";
import { formatDistanceFromNow } from "@/utils/helpers";

import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "@/hooks/products/useDeleteBooking";

import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiPencil,
  HiTrash,
} from "react-icons/hi2";

import Tag from "@/components/ui/Tag";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import RoundImage from "../ui/RoundImage";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function ProductRow({
  product: { id: productId, name, createdAt, soldNumber, images },
}) {
  const navigate = useNavigate();
  // const { deleteBooking, isDeleting } = useDeleteBooking();

  return (
    <Table.Row>
      <RoundImage path={images[0].image.path} alt={name} />
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
                onClick={() => navigate(`/san-pham/${productId}`)}
              >
                See details
              </Menus.Button>

              <Menus.Button icon={<HiPencil />}>Chỉnh sửa</Menus.Button>

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
