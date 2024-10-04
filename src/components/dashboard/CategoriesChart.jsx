import styled from "styled-components";
import { eachDayOfInterval, subDays } from "date-fns";
import { useDarkMode } from "@/context/DarkModeContext";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate } from "@/utils/helpers";

import DashboardBox from "./DashboardBox";
import Heading from "@/components/ui/Heading";

const StyledCategoriesChart = styled(DashboardBox)`
  /* grid-column: 1 / -1; */

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function CategoriesChart({ categories, firstDate, lastDate }) {
  const { isDarkMode } = useDarkMode();

  const data = categories.map((category) => {
    return {
      label: category.categoryName,
      quantity: category.quantity,
    };
  });

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${
      y + height
    } ${x + width}, ${y + height}
        Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const colorArrays = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "red",
    "pink",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "violet",
    "cyan",
    "magenta",
    "brown",
    "black",
  ];

  return (
    <StyledCategoriesChart>
      <Heading as="h2">
        Danh mục sản phẩm đã bán từ {firstDate} &mdash; {lastDate}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} height={300} width={700}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" />
          <YAxis />
          <Legend />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Bar
            dataKey="quantity"
            shape={<TriangleBar />}
            name="Đã bán"
            fill="#8884d8"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorArrays[index % 20]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </StyledCategoriesChart>
  );
}

export default CategoriesChart;
