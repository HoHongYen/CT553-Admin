import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CreateCategoryForm from "./CreateCategoryForm";

function AddCategory() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="category-form">
          <Button> <span className="mr-2">+</span> Thêm danh mục</Button>
        </Modal.Open>
        <Modal.Window name="category-form">
          <CreateCategoryForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCategory;
