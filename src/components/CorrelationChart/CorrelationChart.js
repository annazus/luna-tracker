import React from "react";

import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel
} from "victory";

const Chart = ({ week, symptoms }) => (
  <VictoryChart theme={VictoryTheme.material} domainPadding={{ x: 4 }}>
    {console.log(week)}
    <VictoryAxis
      crossAxis
      tickValues={week.map((d, i) => i)}
      tickFormat={week.map((d, i) => `${d.dayOfMonth} ${d.month}`)}
    />
    <VictoryStack>
      {symptoms.map(({ color, values }, i) => (
        <VictoryBar
          key={i}
          data={values}
          color={color}
          x="day"
          y="symptoms"
          labelComponent={<VictoryTooltip />}
        />
      ))}
    </VictoryStack>
    <VictoryLabel angle={90} verticalAnchor="middle" textAnchor="end" />
  </VictoryChart>
);

export default Chart;
