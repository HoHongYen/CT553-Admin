import styled from "styled-components";
import { subDays } from "date-fns";
import { useDarkMode } from "@/context/DarkModeContext";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatDate, formatMonth } from "@/utils/helpers";

import DashboardBox from "./DashboardBox";
import Heading from "@/components/ui/Heading";

const StyledUsersChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function UsersChart({ users, firstDate, lastDate, isYearPicker }) {
  const { isDarkMode } = useDarkMode();

  const data = users.map((user) => {
    const tempDate = new Date(user.date);
    const date = subDays(tempDate, 1);
    return {
      label: isYearPicker ? formatMonth(date) : formatDate(date),
      totalUsers: user.totalUsers,
      newUsers: user.newUsers,
    };
  });
  const colors = isDarkMode
    ? [{ fill: "#FFBB28" }, { fill: "#d0ed57" }]
    : [{ fill: "#0088FE" }, { fill: "#00C49F" }];

  const background = isDarkMode ? "#18212f" : "#fff";

  return (
    <StyledUsersChart>
      <Heading as="h2">
        Số người dùng từ {firstDate} &mdash; {lastDate}
      </Heading>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} width={400} height={400}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            label={{
              value: "Số người dùng (người)",
              angle: -90,
              position: "insideBottomLeft",
              fontSize: "1.3rem",
            }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Line
            name="Tổng người dùng"
            dataKey="totalUsers"
            stroke="#8884d8"
            unit=" người"
          />
          <Line
            name="Người dùng mới"
            dataKey="newUsers"
            stroke="#82ca9d"
            unit=" người"
          />
          <Tooltip contentStyle={{ backgroundColor: background }} />
        </LineChart>
      </ResponsiveContainer>
    </StyledUsersChart>
  );
}

export default UsersChart;
