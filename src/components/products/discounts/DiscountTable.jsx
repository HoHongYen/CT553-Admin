import { Skeleton } from "antd";
import DiscountRow from "@/components/products/discounts/DiscountRow";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";

function DiscountTable({ discounts, setDiscounts }) {
  if (!discounts) return <Skeleton active />;
  return (
    <Menus>
      <Table columns="0.5fr 2fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div>STT</div>
          <div>Loại giảm giá</div>
          <div>Giá giảm</div>
          <div>Ngày bắt đầu</div>
          <div>Ngày kết thúc</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={discounts}
          render={(discount, index) => (
            <DiscountRow
              key={discount.discountValue}
              discount={discount}
              index={index}
              setDiscounts={setDiscounts}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default DiscountTable;
