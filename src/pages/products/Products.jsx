import { useNavigate } from "react-router-dom";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import ProductTable from "@/components/products/ProductTable";
import Button from "@/components/ui/Button";
import ProductFilterOperations from "@/components/products/ProductFilterOperations";

function Products() {
  const navigate = useNavigate();
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Sản phẩm</Heading>
        <ProductFilterOperations />
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
