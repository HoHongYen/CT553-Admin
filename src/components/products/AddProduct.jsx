import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CreateProductForm from "./CreateProductForm";

function AddProduct() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="product-form">
          <Button>Thêm sản phẩm</Button>
        </Modal.Open>
        <Modal.Window name="product-form">
          <CreateProductForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddProduct;
