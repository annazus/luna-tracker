import React from "react";

import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryStack,
  VictoryTheme,
  VictoryTooltip
} from "victory";

const Chart = ({ week, symptoms }) => (
  <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
    {console.log(week)}
    <VictoryAxis
      tickValues={week.map((d, i) => d.dayOfMonth)}
      tickFormat={week.map((d, i) => d.dayOfMonth)}
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
  </VictoryChart>
);

export default Chart;
