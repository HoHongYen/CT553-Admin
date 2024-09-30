import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import { useRecentBookings } from "@/hooks/dashboard/useRecentBookings";
import { useRecentStays } from "@/hooks/dashboard/useRecentStays";
import { useUsers } from "@/hooks/users/useUsers";
import { useProducts } from "@/hooks/products/useProducts";
import { useOrders } from "@/hooks/orders/useOrders";

import Spinner from "@/components/ui/Spinner";
import Stats from "@/components/dashboard/Stats";
import SalesChart from "@/components/dashboard/SalesChart";
import OrdersChart from "../dashboard/OrdersChart";
import PaymentMethodsChart from "../dashboard/PaymentMethodsChart";
import ProductsChart from "../dashboard/ProductsChart";
import CategoriesChart from "../dashboard/CategoriesChart";
import UsersChart from "../dashboard/UsersChart";
import { useReports } from "@/hooks/dashboard/useReports";
import { eachDayOfInterval, subDays } from "date-fns";

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const StyledStatusLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
`;

const StyledGraphLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
`;

export function DashboardLayout() {
  const [searchParams] = useSearchParams();
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  const {
    isLoading,
    ordersByDate,
    salesByDate,
    productsSoldByDate,
    parentCategoryQuantity,
    paymentMethodQuantity,
    usersByDate,
  } = useReports();

  const tempAllDates = salesByDate.map((sale) => new Date(sale.date));
  // allDates is tempAllDates minus 1 day
  const allDates = eachDayOfInterval({
    start: subDays(tempAllDates[0], 1),
    end: subDays(tempAllDates.at(-1), 1),
  });

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <StyledStatusLayout>
        <Stats
          products={productsSoldByDate}
          orders={ordersByDate}
          users={usersByDate}
          sales={salesByDate}
        />
      </StyledStatusLayout>
      <StyledGraphLayout>
        <SalesChart sales={salesByDate} allDates={allDates} />
        <PaymentMethodsChart
          paymentMethods={paymentMethodQuantity}
          allDates={allDates}
        />
        <OrdersChart orders={ordersByDate}  allDates={allDates}/>
        <ProductsChart products={productsSoldByDate} allDates={allDates} />
        <CategoriesChart categories={parentCategoryQuantity} allDates={allDates} />
        <UsersChart users={usersByDate} allDates={allDates} />
      </StyledGraphLayout>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
