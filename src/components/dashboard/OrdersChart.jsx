import styled from "styled-components";
import { subDays } from "date-fns";
import { useDarkMode } from "@/context/DarkModeContext";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate } from "@/utils/helpers";

import DashboardBox from "./DashboardBox";
import Heading from "@/components/ui/Heading";

const StyledOrdersChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function OrdersChart({ orders, allDates }) {
  const { isDarkMode } = useDarkMode();

  const data = orders.map((order) => {
    const tempDate = new Date(order.date);
    const date = subDays(tempDate, 1);
    return {
      label: formatDate(date),
      totalAlreadyPaid: order.totalAlreadyPaid,
      totalUnpaid: order.totalUnpaid,
    };
  });

  const colors = isDarkMode
    ? {
        totalUnpaid: { stroke: "#4f46e5", fill: "#4f46e5" },
        totalAlreadyPaid: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalUnpaid: { stroke: "#4f46e5", fill: "#c7d2fe" },
        totalAlreadyPaid: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledOrdersChart>
      <Heading as="h2">
        Số đơn hàng từ {formatDate(allDates.at(0))} &mdash;{" "}
        {formatDate(allDates.at(-1))}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} height={300} width={700}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          {/* <Tooltip /> */}
          <Legend />
          <Bar
            stackId="a"
            dataKey="totalAlreadyPaid"
            name="Đã thanh toán"
            fill="#82ca9d"
            activeBar={
              <Rectangle
                fill={colors.totalAlreadyPaid.fill}
                stroke={colors.totalAlreadyPaid.stroke}
              />
            }
          />
          <Bar
            stackId="a"
            dataKey="totalUnpaid"
            name="Chưa thanh toán"
            fill={"#8884d8"}
            activeBar={
              <Rectangle
                fill={colors.totalUnpaid.fill}
                stroke={colors.totalUnpaid.stroke}
              />
            }
          />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
        </BarChart>
      </ResponsiveContainer>
    </StyledOrdersChart>
  );
}

export default OrdersChart;
