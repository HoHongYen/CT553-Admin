import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import ProductTable from "@/components/products/ProductTable";
import ProductTableOperations from "@/components/products/ProductTableOperations";

function Products() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <ProductTableOperations />
      </Row>
      <ProductTable data="bookings" />
    </>
  );
}

export default Products;
