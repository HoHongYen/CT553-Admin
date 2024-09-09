import VariantRow from "@/components/products/VariantRow";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import { Skeleton } from "antd";

function VariantTable({ variants, setVariants }) {
  if (!variants) return <Skeleton active />;
  return (
    <Menus>
      <Table columns="0.5fr 3fr 1fr 1fr 1fr">
        <Table.Header>
          <div>STT</div>
          <div>Kích thước</div>
          <div>Giá</div>
          <div>Số lượng</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={variants}
          render={(variant, index) => (
            <VariantRow
              key={variant.size}
              variant={variant}
              index={index}
              variants={variants}
              setVariants={setVariants}
            />
          )}
        />
      </Table>
    </Menus>
  );
}

export default VariantTable;
