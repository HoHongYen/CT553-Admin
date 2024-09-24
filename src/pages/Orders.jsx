import { useOrders } from "@/hooks/orders/useOrders";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import OrderTable from "@/components/orders/OrderTable";
import OrderFilterOperations from "@/components/orders/OrderFilterOperations";
import Pagination from "@/components/ui/Pagination";

function Orders() {
  const { totalOrders, totalPages } = useOrders();

  return (
    <>
      <Row>
        <Heading as="h1">Đơn hàng</Heading>
        <div className="flex justify-end">
          <OrderFilterOperations />
        </div>
      </Row>
      <Row>
        <OrderTable />
        <div className="mt-10">
          <Pagination
            count={totalOrders}
            totalPages={totalPages}
            label="đơn hàng"
          />
        </div>
      </Row>
    </>
  );
}

export default Orders;
