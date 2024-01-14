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
    newItem["plot"] = key;
    data.forEach((item) => {
      newItem[item.display_name] = item[key];
    });
    return newItem;
  });

  return dataByDatedResult;
}

const chartSettings = {
  height: 300,
  margin: { top: 15, bottom: 100, left: 100, right: 15 },
  tooltip: { trigger: "item" },
  slotProps: {
    legend: {
      direction: "row",
      position: { vertical: "bottom", horizontal: "middle" },
      padding: 0,
      itemMarkWidth: 8,
      itemMarkHeight: 8,
      markGap: 3,
      itemGap: 3,
    },
  },
};

function CertificationResultGraphs(props: { title: string; variant: "energy" | "demand" | "load"; data: any[] }) {
  return (
    <>
      <Stack direction="column" sx={{ width: "100%" }}>
        <Stack className="content-block-heading">
          <h3>{props.title}:</h3>
        </Stack>
        {props.variant === "energy" && <GraphAnnualEnergy data={props.data} chartSettings={chartSettings} />}
        {props.variant === "demand" && <GraphAnnualDemand data={props.data} chartSettings={chartSettings} />}
        {props.variant === "load" && <GraphPeakLoad data={props.data} chartSettings={chartSettings} />}
      </Stack>
    </>
  );
}

export default CertificationResultGraphs;
