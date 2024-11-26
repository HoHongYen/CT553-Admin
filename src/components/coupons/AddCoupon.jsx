import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CreateCouponForm from "./CreateCouponForm";

function AddCoupon() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="coupon-form">
          <Button>
            <span className="mr-2">+</span>Thêm mã giảm giá
          </Button>
        </Modal.Open>
        <Modal.Window name="coupon-form">
          <CreateCouponForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCoupon;
