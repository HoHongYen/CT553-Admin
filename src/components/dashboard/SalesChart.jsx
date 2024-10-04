import styled from "styled-components";
import { subDays } from "date-fns";
import { useDarkMode } from "@/context/DarkModeContext";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate, formatMonth } from "@/utils/helpers";

import DashboardBox from "./DashboardBox";
import Heading from "@/components/ui/Heading";

const StyledSalesChart = styled(DashboardBox)`
  /* grid-column: 1 / -1; */

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ sales, firstDate, lastDate, isYearPicker }) {
  const { isDarkMode } = useDarkMode();

  const data = sales.map((sale) => {
    const tempDate = new Date(sale.date);
    const date = subDays(tempDate, 1);
    return {
      label: isYearPicker ? formatMonth(date) : formatDate(date),
      totalSales: sale.totalSales / 1000000,
      paidSales: sale.paidSales / 1000000,
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        paidSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        paidSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">
        Doanh thu từ {firstDate} &mdash; {lastDate}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} height={300} width={700}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            label={{
              value: "Doanh thu (triệu đồng)",
              angle: -90,
              position: "insideBottomLeft",
              style: { fontSize: 13 },
            }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Tổng doanh thu"
            unit=" trđ"
          />
          <Area
            dataKey="paidSales"
            type="monotone"
            stroke={colors.paidSales.stroke}
            fill={colors.paidSales.fill}
            strokeWidth={2}
            name="Đã thu"
            unit=" trđ"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
