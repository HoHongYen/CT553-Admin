import { useProducts } from "@/hooks/products/useProducts";

import ProductRow from "./ProductRow";
import Table from "@/components/ui/Table";
import Menus from "@/components/ui/Menus";
import Spinner from "@/components/ui/Spinner";
import Pagination from "@/components/ui/Pagination";

function ProductTable() {
  const { isLoading, products, totalProducts, totalPages } = useProducts();
  if (isLoading) return <Spinner />;
  if (!products.length) return <p>Không có sản phẩm nào!</p>;

  return (
    <Menus>
      <Table columns="1fr 1fr 4fr 1.5fr 1.5fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Mã sản phẩm</div>
          <div>Tên sản phẩm</div>
          <div>Ngày thêm</div>
          <div>Giảm giá</div>
          <div>Đã bán</div>
          <div>Còn lại</div>
          <div>Đánh giá</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={products}
          render={(product) => (
            <ProductRow key={product.id} product={product} />
          )}
        />

        <Table.Footer>
          <Pagination
            count={totalProducts}
            totalPages={totalPages}
            label="sản phẩm"
          />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default ProductTable;
