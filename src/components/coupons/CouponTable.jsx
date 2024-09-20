import { useCoupons } from "@/hooks/coupons/useCoupons";
import { Skeleton } from "antd";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import CouponRow from "./CouponRow";

function CouponTable() {
  const { isLoading, coupons } = useCoupons();

  if (isLoading) return <Skeleton />;
  if (!coupons.length) return <p>Không có coupons nào!</p>;

  return (
    <Menus>
      <Table columns="0.5fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>Mã coupon</div>
          <div>Loại giảm giá</div>
          <div>Giá trị giảm</div>
          <div>Số lượng</div>
          <div>Số lượng đã sử dụng</div>
          <div>Ngày bắt đầu</div>
          <div>Ngày kết thúc</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={coupons}
          render={(coupon) => (
            <CouponRow
              key={coupon.id}
              coupon={coupon}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default CouponTable;
