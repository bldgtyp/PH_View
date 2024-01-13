import { BarChart } from "@mui/x-charts/BarChart";
import { prepareDataForPlot } from "./GraphContainer";
import { axisClasses } from "@mui/x-charts";

export function GraphAnnualEnergy(graphProps: { data: any[]; chartSettings: any }) {
  if (graphProps.data.length === 1) {
    return <div>No Data.</div>;
  }

  const dataByDatedResult = prepareDataForPlot(graphProps.data);

  return (
    <BarChart
      dataset={dataByDatedResult}
      series={[
        { dataKey: "SPACE HEATING", label: "Heating", stack: "A" },
        { dataKey: "SPACE COOLING", label: "Cooling", stack: "A" },
        { dataKey: "HOT WATER", label: "Hot Water", stack: "A" },
        { dataKey: "MISC. ELEC.", label: "Misc. Elec.", stack: "A" },
        { dataKey: "LIGHTING", label: "Lighting", stack: "A" },
        { dataKey: "LARGE APPLIANCES", label: "Large Appliances", stack: "A" },
        { dataKey: "AUX. ELEC. (FANS)", label: "Pumps & Fans", stack: "A" },
      ]}
      xAxis={[{ scaleType: "band", dataKey: "plot", categoryGapRatio: 0.3, barGapRatio: 0.1 }]}
      {...graphProps.chartSettings}
    />
  );
}
