import { prepareDataForPlot } from "./GraphContainer";
import { BarChart } from "@mui/x-charts/BarChart";

export function GraphAnnualDemand(graphProps: { data: any[]; chartSettings: any }) {
  if (graphProps.data.length < 3) {
    return <div>No Data.</div>;
  }

  const dataByDatedResult = prepareDataForPlot(graphProps.data);

  return (
    <BarChart
      dataset={dataByDatedResult}
      series={[
        { dataKey: "HEAT DEMAND", label: "Heating", stack: "A" },
        { dataKey: "COOLING DEMAND [SENSIBLE]", label: "Sensible Cooling", stack: "B" },
        { dataKey: "COOLING DEMAND [LATENT]", label: "Latent Cooling", stack: "B" },
      ]}
      xAxis={[{ scaleType: "band", dataKey: "plot", categoryGapRatio: 0.3, barGapRatio: 0.1 }]}
      {...graphProps.chartSettings}
    />
  );
}
