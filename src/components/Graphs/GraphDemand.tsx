import { prepareDataForPlot } from "./GraphCertificationResults";
import { BarChart } from "@mui/x-charts/BarChart";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";

export function GraphAnnualDemand(graphProps: {
  data: any[];
  chartSettings: any;
  limits: { heating: number; cooling: number };
}) {
  if (graphProps.data.length < 3) {
    return <div>No Data.</div>;
  }

  const dataByDatedResult = prepareDataForPlot(graphProps.data);

  return (
    <BarChart
      dataset={dataByDatedResult}
      series={[
        {
          dataKey: "HEAT DEMAND",
          label: "Heating",
          stack: "A",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
        {
          dataKey: "COOLING DEMAND [SENSIBLE]",
          label: "Sensible Cooling",
          stack: "B",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
        {
          dataKey: "COOLING DEMAND [LATENT]",
          label: "Latent Cooling",
          stack: "B",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
      ]}
      {...graphProps.chartSettings}
      yAxis={[{ ...graphProps.chartSettings.yAxis[0], max: 3000000 }]}
      colors={[
        "#CB6D69", // Heating
        "#82B2D9", // Cooling
        "#aecfe8", // Dehumidification Override
      ]}
    >
      <ChartsReferenceLine
        y={graphProps.limits.heating}
        lineStyle={{ strokeDasharray: "10 5", stroke: "#8f3c39", strokeWidth: "2" }}
        labelStyle={{ fontSize: "0.6em", fill: "#8f3c39", fontWeight: "bold" }}
        label={`Heating Limit`}
        labelAlign="start"
        className="test"
      />
      <ChartsReferenceLine
        y={graphProps.limits.cooling}
        lineStyle={{ strokeDasharray: "10 5", stroke: "#46759c", strokeWidth: "2" }}
        labelStyle={{ fontSize: "0.6em", fill: "#46759c", fontWeight: "bold" }}
        label={`Cooling Limit`}
        labelAlign="end"
        className="test"
      />
    </BarChart>
  );
}
