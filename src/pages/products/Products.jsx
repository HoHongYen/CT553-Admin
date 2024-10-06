import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import ProductTable from "@/components/products/ProductTable";
import ProductFilterOperations from "@/components/products/ProductFilterOperations";

function Products() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Sản phẩm</Heading>
        <ProductFilterOperations />
      </Row>
      <Row>
        <ProductTable data="products" />
      </Row>
    </>
  );
}

export default Products;
