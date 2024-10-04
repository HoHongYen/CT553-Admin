import styled from "styled-components";
import { useDarkMode } from "@/context/DarkModeContext";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { formatDate } from "@/utils/helpers";

import DashboardBox from "./DashboardBox";
import Heading from "@/components/ui/Heading";

const StyledPaymentMethodsChart = styled(DashboardBox)`
  /* grid-column: 1 / -1; */

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function PaymentMethodsChart({
  paymentMethods,
  firstDate,
  lastDate,
}) {
  const { isDarkMode } = useDarkMode();

  const COD = paymentMethods.filter(
    (method) => method.paymentMethodName === "COD"
  );
  const VNPAY = paymentMethods.filter(
    (method) => method.paymentMethodName === "VNPAY"
  );

  const data = [
    { name: "Thanh toán qua VNPAY", value: VNPAY[0]?.quantity },
    { name: "Thanh toán khi nhận hàng", value: COD[0]?.quantity },
  ];

  const colors = isDarkMode
    ? [{ fill: "#FFBB28" }, { fill: "#d0ed57" }]
    : [{ fill: "#0088FE" }, { fill: "#00C49F" }];

  const background = isDarkMode ? "#18212f" : "#fff";

  const text = isDarkMode ? "#e5e7eb" : "#374151";

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "1.3rem" }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <StyledPaymentMethodsChart>
      <Heading as="h2">
        Phương thức thanh toán từ {firstDate} &mdash; {lastDate}
      </Heading>
      <div className="flex w-full h-[300px]">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              fill="#8884d8"
              outerRadius={100}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  text={text}
                  fill={colors[index % colors.length].fill}
                />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: background }} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col justify-center gap-5">
          <ul className="mt-3">
            {data.map((item, index) => (
              <li key={index} className="flex items-center">
                <span
                  className="w-6 h-6 mr-2"
                  style={{
                    backgroundColor: colors[index % colors.length].fill,
                  }}
                ></span>
                <span>
                  {item.name === "Thanh toán khi nhận hàng" ? "COD" : "VNPAY"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StyledPaymentMethodsChart>
  );
}

export default PaymentMethodsChart;
