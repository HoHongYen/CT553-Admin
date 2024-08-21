import CreateCategoryForm from "@/components/categories/CreateCategoryForm";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";

function CreateCategory() {

  return (
    <>
      <Heading as="h1">Thêm danh mục</Heading>

      <Row>
        {/* <Heading as="h3">Thông tin cá nhân</Heading> */}
        <CreateCategoryForm />
      </Row>
    </>
  );
}

export default CreateCategory;
