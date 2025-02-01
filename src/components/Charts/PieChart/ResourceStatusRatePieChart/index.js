import React, { PureComponent } from "react";
import { PieChart, Pie, ResponsiveContainer, Sector, Legend } from "recharts";

const data01 = [
  { name: "full", value: 270 },
  { name: "free", value: 20 },
];
const data02 = [
  { name: "full", value: 275 },
  { name: "free", value: 15 },
];
const data03 = [
  { name: "full", value: 280 },
  { name: "free", value: 10 },
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const sx = cx - 2;
  const sy = cy - (outerRadius + innerRadius) / 2;
  const mx = sx + 30;
  const my = sy - (outerRadius * 2) / 3 + 30;
  const ex = mx + 22;
  const ey = my;
  const textAnchor = "start";

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={90}
        endAngle={360}
        fill="#9BB8CD88"
        cornerRadius={90}
      />

      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={90}
      />

      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        strokeWidth={2}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${payload.name} ${value}`}</text>
      <text x={ex + 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

const renderInactiveShape = () => {
  return null;
};

export default class ResourceStatusRatePieChart extends PureComponent {
  static demoUrl = "https://codesandbox.io/s/pie-chart-of-two-levels-gor24";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Pie
            data={data03}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={96}
            outerRadius={116}
            fill="#5eead4"
            activeIndex={0}
            activeShape={renderActiveShape}
            inactiveShape={renderInactiveShape}
            startAngle={90}
            endAngle={360}
          />
          <Pie
            data={data02}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={66}
            outerRadius={86}
            fill="#82ca9d"
            activeIndex={0}
            activeShape={renderActiveShape}
            inactiveShape={renderInactiveShape}
            startAngle={90}
            endAngle={360}
          />
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={56}
            fill="#8884d8"
            activeIndex={0}
            activeShape={renderActiveShape}
            inactiveShape={renderInactiveShape}
            startAngle={90}
            endAngle={360}
          />
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
