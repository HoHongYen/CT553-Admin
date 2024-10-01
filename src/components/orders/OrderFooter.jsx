import {
  PAYMENT_STATUS_COLOR,
  PAYMENT_STATUS_TEXT,
} from "@/utils/constants";
import { formatCurrency } from "@/utils/helpers";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Tag from "@/components/ui/Tag";
import { popupInfoMapping } from "./OrderRow";
import { useUpdateOrderStatus } from "@/hooks/orders/useUpdateOrderStatus";

function OrderFooter({ order }) {
  const { updateOrderStatus } = useUpdateOrderStatus();

  console.log(order);

  const handleConfirmUpdate = () => {
    updateOrderStatus({
      orderId: order.id,
      updatedOrder: {
        fromStatus: order.currentStatusId,
        toStatus: order.currentStatusId + 1,
      },
    });
  };

  const isNeedUpdate = order.currentStatusId <= 3;
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <div className="italic">
          <span className="font-semibold mr-2">Phí vận chuyển:</span>{" "}
          {formatCurrency(order.shippingFee)}
        </div>
        {order.totalDiscount > 0 && (
          <div className="italic">
            <span className="font-semibold mr-2">Áp dụng coupon:</span> -
            {formatCurrency(order.totalDiscount)}
          </div>
        )}
        <div className="italic">
          <span className="font-semibold mr-2">Phương thức thanh toán:</span>{" "}
          {order.payment.paymentMethod.name === "COD"
            ? "Thanh toán khi nhận hàng"
            : "Thanh toán qua VNPAY"}
        </div>
        <div className="flex items-center italic">
          <span className="font-semibold mr-2">Tổng thanh toán:</span>
          <h3 className="text-4xl text-[var(--color-green-700)] font-bold mt-auto">
            {formatCurrency(order.finalPrice)}
          </h3>
        </div>
        <div className="flex items-center italic">
          <span className="font-semibold mr-2">Trạng thái thanh toán:</span>{" "}
          <Tag
            className="not-italic"
            type={`${PAYMENT_STATUS_COLOR[order.payment.paymentStatus.name]}`}
          >
            {PAYMENT_STATUS_TEXT[order.payment.paymentStatus.name]}
          </Tag>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {isNeedUpdate ? (
          <Modal>
            <Modal.Open opens="updateOrderStatus">
              <Button
                variation={
                  popupInfoMapping[order.currentStatus.name]
                    ?.variation || "secondary"
                }
              >
                {popupInfoMapping[order.currentStatus.name]?.label}
              </Button>
            </Modal.Open>
            <Modal.Window name="updateOrderStatus">
              <ConfirmCertain
                resourceName={
                  popupInfoMapping[order.currentStatus.name]?.text
                }
                variation="primary"
                onConfirm={handleConfirmUpdate}
              />
            </Modal.Window>
          </Modal>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default OrderFooter;
