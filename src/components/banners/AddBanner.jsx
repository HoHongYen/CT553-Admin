import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CreateBannerForm from "./CreateBannerForm";

function AddBanner() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="banner-form">
          <Button>
            {" "}
            <span className="mr-2">+</span> Thêm banner
          </Button>
        </Modal.Open>
        <Modal.Window name="banner-form">
          <CreateBannerForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddBanner;
