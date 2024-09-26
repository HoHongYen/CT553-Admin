import { useNavigate } from "react-router-dom";
import { useOrder } from "@/hooks/orders/useOrder";
import { Skeleton } from "antd";
import Row from "@/components/ui/Row";
import Heading from "@/components/ui/Heading";
import ButtonText from "@/components/ui/ButtonText";
import OrderHeader from "@/components/orders/OrderHeader";
import OrderDetailItem from "@/components/orders/OrderDetailItem";
import OrderFooter from "@/components/orders/OrderFooter";
import OrderTracking from "@/components/orders/OrderTracking";
import { useMoveBack } from "@/hooks/common/useMoveBack";

function OrderDetail() {
  const moveBack = useMoveBack();
  const { isLoading, order } = useOrder();

  if (isLoading) return <Skeleton active />;

  return (
    <>
      <Row>
        <Heading as="h1">Chi tiết đơn hàng #{order.id}</Heading>
        <div className="flex justify-end">
          <ButtonText onClick={moveBack}>
            &larr; Quay lại
          </ButtonText>
        </div>
        <div className="relative flex flex-col gap-4 bg-[var(--color-grey-0)] px-6 py-6 rounded-md shadow-[0_2px_12px_-3px_var(--color-blue-700)]">
          <OrderHeader order={order} />
          <div>
            {order?.orderDetail?.map((orderDetail, index) => (
              <OrderDetailItem
                key={index}
                orderDetail={orderDetail}
                currentStatus={order.currentStatus}
              />
            ))}
          </div>
          <OrderFooter order={order} />
          {/* tracking order */}
          <div className="mt-4">
            <OrderTracking order={order} />
          </div>
        </div>
      </Row>
    </>
  );
}

export default OrderDetail;
