import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CreateDiscountForm from "./CreateDiscountForm";

function AddDiscount({ discounts, setDiscounts }) {
  return (
    <div>
      <Modal>

        <Modal.Open opens="discount-form">
          <Button>
            <span className="mr-2">+</span>Thêm chương trình giảm giá
          </Button>
        </Modal.Open>
        <Modal.Window name="discount-form">
          <CreateDiscountForm
            discounts={discounts}
            setDiscounts={setDiscounts}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddDiscount;
