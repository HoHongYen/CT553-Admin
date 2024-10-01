import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import AddCategory from "@/components/categories/AddCategory";
import CategoryTable from "@/components/categories/CategoryTable";
import CategoryFilterOperations from "@/components/categories/CategoryFilterOperations";

function Categories() {
  return (
    <>
      <Row>
        <Heading as="h1">Danh mục sản phẩm</Heading>
        <div className="flex justify-end">
          <CategoryFilterOperations />
        </div>
      </Row>
      <Row>
        <CategoryTable />
        <AddCategory />
      </Row>
    </>
  );
}

export default Categories;
