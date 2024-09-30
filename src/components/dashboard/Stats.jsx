import { formatCurrency } from "@/utils/helpers";

import {
  HiOutlineBanknotes,
  HiOutlinePhoto,
  HiOutlineShoppingBag,
  HiOutlineUser,
} from "react-icons/hi2";

import Stat from "./Stat";

function Stats({ products, orders, users, sales }) {
  const totalSales = sales.reduce((acc, sale) => acc + sale.totalSales, 0);
  const totalOrders = orders.reduce(
    (acc, order) => acc + order.totalAlreadyPaid + order.totalUnpaid,
    0
  );
  const totalProducts = products.reduce(
    (acc, product) => acc + product.totalProducts,
    0
  );

  // get totalUser of last item in users array
  const totalUsers = users[users.length - 1].totalUsers;

  return (
    <>
      <Stat
        title="Tổng doanh thu"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(totalSales)}
      />

      <Stat
        title="Số đơn hàng"
        color="indigo"
        icon={<HiOutlineShoppingBag />}
        value={totalOrders}
      />

      <Stat
        title="Số sản phẩm đã bán"
        color="yellow"
        icon={<HiOutlinePhoto />}
        value={totalProducts}
      />

      <Stat
        title="Số khách hàng"
        color="red"
        icon={<HiOutlineUser />}
        value={totalUsers}
      />
    </>
  );
}

export default Stats;
