import { BarChart } from "@mui/x-charts/BarChart";
import { prepareDataForPlot } from "./GraphContainer";

export function GraphPeakLoad(graphProps: { data: any[]; chartSettings: any }) {
  if (graphProps.data.length < 3) {
    return <div>No Data.</div>;
  }

  const dataByDatedResult = prepareDataForPlot(graphProps.data);

  return (
    <BarChart
      dataset={dataByDatedResult}
      series={[
        { dataKey: "PEAK HEAT LOAD", label: "Heating", stack: "A" },
        { dataKey: "PEAK COOLING LOAD [SENSIBLE]", label: "Sensible Cooling", stack: "B" },
        { dataKey: "PEAK COOLING LOAD [LATENT]", label: "Latent Cooling", stack: "B" },
      ]}
      xAxis={[{ scaleType: "band", dataKey: "plot", categoryGapRatio: 0.3, barGapRatio: 0.1 }]}
      {...graphProps.chartSettings}
    />
  );
}
