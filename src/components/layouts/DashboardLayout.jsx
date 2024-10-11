import styled from "styled-components";
import { formatDate, formatMonth } from "@/utils/helpers";
import { useReports } from "@/hooks/dashboard/useReports";
import { eachDayOfInterval, subDays } from "date-fns";

import Spinner from "@/components/ui/Spinner";
import Stats from "@/components/dashboard/Stats";
import SalesChart from "@/components/dashboard/SalesChart";
import OrdersChart from "../dashboard/OrdersChart";
import PaymentMethodsChart from "../dashboard/PaymentMethodsChart";
import ProductsChart from "../dashboard/ProductsChart";
import CategoriesChart from "../dashboard/CategoriesChart";
import UsersChart from "../dashboard/UsersChart";
import Row from "../ui/Row";
import Heading from "../ui/Heading";
import DashboardFilterOperations from "../dashboard/DashboardFilterOperations";

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5rem;
`;

const StyledStatusLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 2.4rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
`;

const StyledGraphLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.4rem;
`;

export function DashboardLayout() {
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
  let allDates = eachDayOfInterval({
    start: subDays(tempAllDates[0], 1),
    end: subDays(tempAllDates.at(-1), 1),
  });

  let isYearPicker = false;
  if (allDates.length > 300) {
    isYearPicker = true;
  }

  const firstDate = isYearPicker
    ? formatMonth(allDates.at(0))
    : formatDate(allDates.at(0));
  const lastDate = isYearPicker
    ? formatMonth(allDates.at(-1))
    : formatDate(allDates.at(-1));

  if (isLoading) return <Spinner />;

  return (
    <>
      <Row id="page1" className="px-5">
        <Heading as="h1" className="flex justify-center">Thống kê</Heading>
        <div className="flex justify-end py-2">
          <DashboardFilterOperations />
        </div>
        {/* </Row> */}
        {/* <Row> */}
        {/* <StyledDashboardLayout> */}
        <StyledStatusLayout>
          <Stats
            products={productsSoldByDate}
            orders={ordersByDate}
            users={usersByDate}
            sales={salesByDate}
          />
        </StyledStatusLayout>
        <StyledGraphLayout>
          <SalesChart
            sales={salesByDate}
            firstDate={firstDate}
            lastDate={lastDate}
            isYearPicker={isYearPicker}
          />
          <PaymentMethodsChart
            paymentMethods={paymentMethodQuantity}
            firstDate={firstDate}
            lastDate={lastDate}
          />
        </StyledGraphLayout>
        <OrdersChart
          orders={ordersByDate}
          firstDate={firstDate}
          lastDate={lastDate}
          isYearPicker={isYearPicker}
        />
        <ProductsChart
          products={productsSoldByDate}
          firstDate={firstDate}
          lastDate={lastDate}
          isYearPicker={isYearPicker}
        />
      </Row>
      <Row id="page2" className="px-5">
        <CategoriesChart
          categories={parentCategoryQuantity}
          firstDate={firstDate}
          lastDate={lastDate}
        />
        <UsersChart
          users={usersByDate}
          firstDate={firstDate}
          lastDate={lastDate}
          isYearPicker={isYearPicker}
        />
        {/* </StyledGraphLayout> */}
        {/* </StyledDashboardLayout> */}
      </Row>
    </>
  );
}

export default DashboardLayout;
