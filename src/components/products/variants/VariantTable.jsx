import { Skeleton } from "antd";
import VariantRow from "@/components/products/variants/VariantRow";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";

function VariantTable({ variants, setVariants }) {
  if (!variants) return <Skeleton active />;
  return (
    <Menus>
      <Table columns="0.5fr 3fr 1fr 1fr 1fr">
        <Table.Header>
          <div>STT</div>
          <div>Kích thước</div>
          <div>Giá</div>
          <div>Số lượng còn lại</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={variants}
          render={(variant, index) => (
            <VariantRow
              key={variant.size}
              variant={variant}
              index={index}
              setVariants={setVariants}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default VariantTable;
