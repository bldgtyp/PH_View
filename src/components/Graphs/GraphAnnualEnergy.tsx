import { BarChart } from "@mui/x-charts/BarChart";
import { prepareDataForPlot } from "./GraphCertificationResults";
import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";

export function GraphAnnualEnergy(graphProps: { data: any[]; chartSettings: any; limitData: { total: number } }) {
  if (graphProps.data.length === 1) {
    return <div>No Data.</div>;
  }

  const dataByDatedResult = prepareDataForPlot(graphProps.data);

  return (
    <BarChart
      dataset={dataByDatedResult}
      series={[
        {
          dataKey: "SPACE HEATING",
          label: "Heating",
          stack: "A",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
        {
          dataKey: "SPACE COOLING",
          label: "Cooling",
          stack: "A",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
        {
          dataKey: "HOT WATER",
          label: "Hot Water",
          stack: "A",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
        {
          dataKey: "MISC. ELEC.",
          label: "Misc. Elec.",
          stack: "A",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
        {
          dataKey: "LIGHTING",
          label: "Lighting",
          stack: "A",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
        {
          dataKey: "LARGE APPLIANCES",
          label: "Large Appliances",
          stack: "A",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
        {
          dataKey: "AUX. ELEC. (FANS)",
          label: "Pumps & Fans",
          stack: "A",
          highlightScope: {
            highlighted: "series",
            faded: "global",
          },
        },
      ]}
      {...graphProps.chartSettings}
      yAxis={[{ ...graphProps.chartSettings.yAxis[0], max: 5000000 }]}
    >
      <ChartsReferenceLine
        y={graphProps.limitData.total}
        lineStyle={{ strokeDasharray: "10 5", strokeWidth: "2" }}
        labelStyle={{ fontSize: "0.6em", fontWeight: "bold" }}
        label={`Phius Limit`}
        labelAlign="end"
        className="test"
      />
    </BarChart>
  );
}
