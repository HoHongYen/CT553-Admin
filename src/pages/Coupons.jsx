import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import CabinTableOperations from "@/components/users/CabinTableOperations";
import CouponTable from "@/components/coupons/CouponTable";
import AddCoupon from "@/components/coupons/AddCoupon";

function Coupons() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Coupons</Heading>
        <CabinTableOperations />
      </Row>
      <Row>
        <CouponTable />
        <AddCoupon />
      </Row>
    </>
  );
}

export default Coupons;
