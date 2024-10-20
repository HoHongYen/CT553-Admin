import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CreateBannerCategoryForm from "./CreateBannerCategoryForm";

function AddBannerCategory() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="banner-category-form">
          <Button>
            {" "}
            <span className="mr-2">+</span> Thêm danh mục banner
          </Button>
        </Modal.Open>
        <Modal.Window name="banner-category-form">
          <CreateBannerCategoryForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBannerCategory;
