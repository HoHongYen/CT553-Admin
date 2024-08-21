import styled from "styled-components";

import { useMoveBack } from "@/hooks/common/useMoveBack";
import { useBooking } from "@/hooks/products/useBooking";
import { useNavigate } from "react-router-dom";
import { useDeleteBooking } from "@/hooks/products/useDeleteBooking";

import ProductDataBox from "./ProductDataBox";

import Row from "@/components/ui/Row";
import Heading from "@/components/ui/Heading";
import Tag from "@/components/ui/Tag";
import ButtonGroup from "@/components/ui/ButtonGroup";
import Button from "@/components/ui/Button";
import ButtonText from "@/components/ui/ButtonText";
import Spinner from "@/components/ui/Spinner";
import Modal from "@/components/ui/Modal";
import ConfirmCertain from "@/components/ui/ConfirmCertain";
import Empty from "@/components/ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function ProductDetail() {
  const {
    // booking: { id },
    booking,
    isLoading,
  } = useBooking();

  const { deleteBooking, isDeleting } = useDeleteBooking();

  const { status, id: bookingId } = booking || {};
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName="booking" />;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <ProductDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check in
          </Button>
        )}
        {status === "checked-in" && (
          <Button disabled>
            Check out
          </Button>
        )}

        <Modal>
          <Modal.Open opens="delete">
            <Button variation="danger">Delete booking</Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmCertain
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() =>
                deleteBooking(bookingId, {
                  onSettled: () => navigate(-1),
                })
              }
            />
          </Modal.Window>
        </Modal>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default ProductDetail;
