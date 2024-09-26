import { useReviews } from "@/hooks/reviews/useReviews";
import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import OrderFilterOperations from "@/components/orders/OrderFilterOperations";
import ReviewTable from "@/components/reviews/ReviewTable";

function Reviews() {

  return (
    <>
      <Row>
        <Heading as="h1">Đánh giá</Heading>
        <div className="flex justify-end">
          {/* <OrderFilterOperations /> */}
        </div>
      </Row>
      <Row>
        <ReviewTable />
      </Row>
    </>
  );
}

export default Reviews;
