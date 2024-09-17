import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import ProductTable from "@/components/products/ProductTable";
import ProductTableOperations from "@/components/products/ProductTableOperations";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/Button";

function Products() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Sản phẩm</Heading>
        <ProductTableOperations />
      </Row>
      <Row>
        <ProductTable data="products" />
        <div className="w-[200px]">
          <Button type="primary" onClick={() => navigate("/san-pham/tao-moi")}>
            <span className="mr-2">+</span>
            Thêm sản phẩm
          </Button>
        </div>
      </Row>
    </>
  );
}

export default Products;
