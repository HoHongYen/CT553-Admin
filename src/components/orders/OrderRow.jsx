import { Link, useNavigate } from "react-router-dom";
import { formatCurrency, formatDate } from "@/utils/helpers";

import { HiEye } from "react-icons/hi2";
import Modal from "@/components/ui/Modal";
import Table from "../ui/Table";
import Tag from "../ui/Tag";
import Button from "../ui/Button";
import ConfirmCertain from "../ui/ConfirmCertain";
import { useUpdateOrderStatus } from "@/hooks/orders/useUpdateOrderStatus";
import {
  ORDER_STATUS_COLOR,
  ORDER_STATUS_TEXT,
  PAYMENT_METHOD,
  PAYMENT_METHOD_COLOR,
  PAYMENT_STATUS_COLOR,
  PAYMENT_STATUS_TEXT,
} from "@/utils/constants";

export const popupInfoMapping = {
  AWAITING_CONFIRM: {
    text: "Bạn có chắc chắn muốn xác nhận đơn hàng này?",
    variation: "primary",
    label: "Xác nhận đơn hàng",
  },
  AWAITING_FULFILLMENT: {
    text: "Bạn có chắc chắn muốn xác nhận đã giao đơn hàng cho đơn vị vận chuyển?",
    variation: "normal",
    label: "Xác nhận đã giao cho vận chuyển",
  },
  DELIVERING: {
    text: "Bạn có chắc chắn muốn xác nhận đã hoàn thành giao đơn hàng này?",
    variation: "success",
    label: "Xác nhận đã giao",
  },
};

function OrderRow({ order }) {
  const navigate = useNavigate();
  const {
    id: orderId,
    buyer: { fullName: buyerFullName, id: buyerId },
    currentStatus: { name: currentStatusName },
    createdAt,
    finalPrice,
    currentStatusId,
    payment: {
      paymentStatus: { name: paymentStatusName },
      paymentMethod: { name: paymentMethodName },
    },
  } = order;

  const { updateOrderStatus } = useUpdateOrderStatus();

  const handleConfirmUpdate = () => {
    updateOrderStatus({
      orderId,
      updatedOrder: {
        fromStatus: currentStatusId,
        toStatus: currentStatusId + 1,
      },
    });
  };

  const isNeedUpdate = currentStatusId <= 3;

  return (
    <>
      <Table.Row>
        <Link to={`/don-hang/${orderId}`} className="font-bold underline">
          #{orderId}
        </Link>
        <div>#{buyerId}</div>
        <div>{buyerFullName}</div>
        <div>{formatDate(createdAt)}</div>
        <div className="font-bold">{formatCurrency(finalPrice)}</div>
        <Tag type={PAYMENT_METHOD_COLOR[paymentMethodName]}>
          {PAYMENT_METHOD[paymentMethodName]}
        </Tag>
        <Tag type={PAYMENT_STATUS_COLOR[paymentStatusName]}>
          {PAYMENT_STATUS_TEXT[paymentStatusName]}
        </Tag>
        <Tag type={ORDER_STATUS_COLOR[currentStatusName]}>
          {ORDER_STATUS_TEXT[currentStatusName]}
        </Tag>
        {isNeedUpdate ? (
          <Modal>
            <Modal.Open opens="updateOrderStatus">
              <Button
                variation={
                  popupInfoMapping[currentStatusName]?.variation || "secondary"
                }
              >
                {popupInfoMapping[currentStatusName]?.label}
              </Button>
            </Modal.Open>
            <Modal.Window name="updateOrderStatus">
              <ConfirmCertain
                resourceName={popupInfoMapping[currentStatusName]?.text}
                variation="primary"
                onConfirm={handleConfirmUpdate}
              />
            </Modal.Window>
          </Modal>
        ) : (
          <div></div>
        )}

        <Button
          variation="secondary"
          className="flex items-center gap-3"
          onClick={() => navigate(`/don-hang/${orderId}`)}
        >
          <HiEye />
          Chi tiết
        </Button>
      </Table.Row>
    </>
  );
}

export default OrderRow;
