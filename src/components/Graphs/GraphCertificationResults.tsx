import { Stack } from "@mui/material";
import { GraphAnnualEnergy } from "./GraphAnnualEnergy";
import { GraphAnnualDemand } from "./GraphDemand";
import { GraphPeakLoad } from "./GraphPeakLoad";

export type GraphProps = {
  key: string;
  id: string;
  display_name: string;
  type: string;
  [key: string]: any;
};

/**
 * Prepares the data for plotting by re-shaping it based on the dated 'RESULT' elements.
 *
 * @param data The original data array.
 * @returns The re-shaped data organized by the dated 'RESULT' elements.
 */
export function prepareDataForPlot(data: any[]) {
  // Get all the dated results keys
  const datedResultsKeys = Object.keys(data[0]).filter((key) => key.includes("RESULT"));
  // Order datedResultsKeys by number / alphabetically
  datedResultsKeys.sort((a, b) => {
    const aNum = parseInt(a.split("_")[0]);
    const bNum = parseInt(b.split("_")[0]);
    if (aNum < bNum) return -1;
    if (aNum > bNum) return 1;
    return 0;
  });

  // re-shape the data so that it is organized by the dated 'RESULT' elements >>
  // data = [
  //  { key: "1", id: "1", display_name: "heating_demand", type: "SITE_ENERGY", xxx_RESULT: 20, yyy_RESULT: 30, },
  //  { key: "2", id: "2", display_name: "cooling_demand", type: "SITE_ENERGY", xxx_RESULT: 30, yyy_RESULT: 40, },
  //  ...
  // ]
  // becomes >>
  // dataByDatedResult = [
  //  { plot: "xxx_RESULT", heating_demand: 10, cooling_demand: 20, lighting: 20, ... },
  //  { plot: "yyy_RESULT", heating_demand: 10, cooling_demand: 20, lighting: 20, ... },
  //  { plot: "zzz_RESULT", heating_demand: 10, cooling_demand: 20, lighting: 20, ... },
  //  ...
  // ]
  const dataByDatedResult = datedResultsKeys.map((key) => {
    const newItem: any = {};
    const [date] = key.split("_"); // Fix the X-Axis...
    newItem["plot"] = date;
    data.forEach((item) => {
      newItem[item.display_name] = item[key];
    });
    return newItem;
  });

  return dataByDatedResult;
}

const chartSettings = {
  colors: [
    "#CB6D69", // Heating
    "#82B2D9", // Cooling
    "#d3d19d", // Green 1
    "#a3c087", // Green 2
    "#6ab07d", // Green 3
    "#529c66", // Green 4
    "#3b824e", // Green 5
  ],
  height: 350,
  margin: { top: 5, bottom: 70, left: 70, right: 15 },
  tooltip: { trigger: "item" },
  sx: {
    "& .MuiChartsLegend-series text": { fontSize: "0.7em !important" },
    "& .MuiChartsAxis-tickLabel": { fontSize: "0.6em !important" },
    "& .MuiBarElement-root": {
      stroke: "#fff",
      strokeWidth: "1",
    },
  },
  slotProps: {
    legend: {
      direction: "row",
      position: { vertical: "bottom", horizontal: "middle" },
      padding: 0,
      itemMarkWidth: 15,
      itemMarkHeight: 10,
      markGap: 3,
      itemGap: 1,
    },
  },
  xAxis: [{ id: "xAxisBand", scaleType: "band", dataKey: "plot", categoryGapRatio: 0.3, barGapRatio: 0.1 }],
  yAxis: [{ id: "yAxisLinear", scaleType: "linear" }],
  leftAxis: {
    axisId: "yAxisLinear",
    disableTicks: true,
  },
  bottomAxis: {
    axisId: "xAxisBand",
    disableTicks: true,
  },
};

function CertificationResultGraphs(props: {
  title: string;
  variant: "energy" | "demand" | "load";
  plotData: any[];
  limitData: { heating: number; cooling: number; total: number };
}) {
  return (
    <>
      <Stack direction="column" sx={{ width: "100%" }}>
        <Stack className="content-block-heading">
          <h3>{props.title}:</h3>
        </Stack>
        {props.variant === "energy" && (
          <GraphAnnualEnergy data={props.plotData} chartSettings={chartSettings} limitData={props.limitData} />
        )}
        {props.variant === "demand" && (
          <GraphAnnualDemand data={props.plotData} chartSettings={chartSettings} limits={props.limitData} />
        )}
        {props.variant === "load" && (
          <GraphPeakLoad data={props.plotData} chartSettings={chartSettings} limits={props.limitData} />
        )}
      </Stack>
    </>
  );
}

export default CertificationResultGraphs;
