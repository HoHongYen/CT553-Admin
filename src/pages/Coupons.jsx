import Heading from "@/components/ui/Heading";
import Row from "@/components/ui/Row";
import CouponTable from "@/components/coupons/CouponTable";

function Coupons() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Mã giảm giá</Heading>
      </Row>
      <Row>
        <CouponTable />
      </Row>
    </>
  );
}

export default Coupons;
