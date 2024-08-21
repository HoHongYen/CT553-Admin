import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import AddCategory from "@/components/categories/AddCategory";
import CabinTableOperations from "@/components/users/CabinTableOperations";
import CategoryTable from "@/components/categories/CategoryTable";

function Categories() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Danh mục sản phẩm</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CategoryTable />
        <AddCategory />
      </Row>
    </>
  );
}

export default Categories;
