import { BarChart } from "@mui/x-charts/BarChart";
import { prepareDataForPlot } from "../../components/graphs/GraphCertificationResults";
import PhiusLimitLine from "../../components/graphs/LimitLine";

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
      <PhiusLimitLine value={graphProps.limitData.total} type="source" />
    </BarChart>
  );
}
