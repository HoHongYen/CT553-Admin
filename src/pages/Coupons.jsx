import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import CouponTable from "@/components/coupons/CouponTable";
import AddCoupon from "@/components/coupons/AddCoupon";

function Coupons() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Coupons</Heading>
      </Row>
      <Row>
        <CouponTable />
        <AddCoupon />
      </Row>
    </>
  );
}

export default Coupons;
