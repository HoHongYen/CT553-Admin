import { useProducts } from "@/hooks/products/useProducts";

import ProductRow from "./ProductRow";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Spinner from "@/components/ui/Spinner";
import Pagination from "@/components/ui/Pagination";

function ProductTable() {
  const { isLoading, products, totalProducts } = useProducts();
  if (isLoading) return <Spinner />;
  if (!products.length) return <p>Không có sản phẩm nào!</p>;

  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div></div>
          <div>Mã sản phẩm</div>
          <div>Tên sản phẩm</div>
          <div>Ngày thêm</div>
          <div>Đã bán</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={products}
          render={(product) => (
            <ProductRow key={product.id} product={product} />
          )}
        />

        <Table.Footer>
          <Pagination count={totalProducts} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ProductTable;
