import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CreateVariantForm from "./CreateVariantForm";

function AddVariant({ variants, setVariants }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="variant-form">
          <Button>
            <span className="mr-2">+</span>Thêm kích thước tranh
          </Button>
        </Modal.Open>
        <Modal.Window name="variant-form">
          <CreateVariantForm variants={variants} setVariants={setVariants} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddVariant;
