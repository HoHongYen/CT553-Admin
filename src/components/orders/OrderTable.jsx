import { useOrders } from "@/hooks/orders/useOrders";
import { Skeleton } from "antd";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import OrderRow from "./OrderRow";
import Pagination from "../ui/Pagination";

function OrderTable() {
  const { isLoading, orders, totalOrders, totalPages } = useOrders();

  if (isLoading) return <Skeleton />;
  if (!orders.length) return <p>Không có đơn hàng nào!</p>;

  return (
    <Menus>
      <Table columns="0.5fr 0.5fr 1fr 1fr 1fr 1fr 2fr 1.5fr 2fr 1.5fr">
        <Table.Header>
          <div>Mã đơn</div>
          <div>Mã khách hàng</div>
          <div>Tên khách hàng</div>
          <div>Ngày đặt hàng</div>
          <div>Tổng thanh toán</div>
          <div>Phương thức thanh toán</div>
          <div>Trạng thái thanh toán</div>
          <div>Trạng thái đơn hàng</div>
          <div>Cập nhật trạng thái đơn hàng</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={orders}
          render={(order) => <OrderRow key={order.id} order={order} />}
        />
        <Table.Footer>
          <Pagination
            count={totalOrders}
            totalPages={totalPages}
            label="đơn hàng"
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default OrderTable;
