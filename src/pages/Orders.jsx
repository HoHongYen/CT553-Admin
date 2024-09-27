import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import OrderTable from "@/components/orders/OrderTable";
import OrderFilterOperations from "@/components/orders/OrderFilterOperations";

function Orders() {

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
      </Row>
    </>
  );
}

export default Orders;
