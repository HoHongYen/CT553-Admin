import styled from "styled-components";
import { eachDayOfInterval, subDays } from "date-fns";
import { useDarkMode } from "@/context/DarkModeContext";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate, randomNumber } from "@/utils/helpers";

import DashboardBox from "./DashboardBox";
import Heading from "@/components/ui/Heading";

const StyledProductsChart = styled(DashboardBox)`
  /* grid-column: 1 / -1; */

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function ProductsChart({ products, allDates }) {
  const { isDarkMode } = useDarkMode();

  const data = products.map((sale) => {
    const tempDate = new Date(sale.date);
    const date = subDays(tempDate, 1);
    return {
      label: formatDate(date),
      totalProducts: sale.totalProducts,
    };
  });

  const colors = isDarkMode
    ? {
        totalProducts: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalProducts: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledProductsChart>
      <Heading as="h2">
        Số sản phẩm đã bán từ {formatDate(allDates.at(0))} &mdash;{" "}
        {formatDate(allDates.at(-1))}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} height={300} width={700}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Legend />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Bar
            dataKey="totalProducts"
            name="Đã bán"
            fill="#8884d8"
            activeBar={
              <Rectangle
                fill={colors.totalProducts.fill}
                stroke={colors.totalProducts.stroke}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="totalProducts"
            name="Đã bán"
            stroke="#ff7300"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </StyledProductsChart>
  );
}

export default ProductsChart;
