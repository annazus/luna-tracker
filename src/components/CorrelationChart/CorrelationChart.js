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
    <VictoryAxis tickValues={week} tickFormat={week} />
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
