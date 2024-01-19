import { ChartsReferenceLine } from "@mui/x-charts/ChartsReferenceLine";

/**
 * Renders a ChartsReferenceLine on the Graph with styling for Phius limits.
 * @param props - The component props.
 * @param props.value - The value of the limit line.
 * @param props.type - The type of the limit line ("heating", "cooling", or "source").
 * @returns The rendered limit line component.
 */
function PhiusLimitLine(props: { value: number | undefined; type: "heating" | "cooling" | "source" }) {
  // --------------------------------------------------------------------------
  // Colors and Labels
  let color = "000000";
  let label = "";
  let position: "start" | "middle" | "end" = "end";
  if (props.type === "source") {
    color = "000000";
    label = "Phius Limit";
    position = "end";
  } else if (props.type === "heating") {
    color = "#8f3c39";
    label = "Heating Limit";
    position = "start";
  } else if (props.type === "cooling") {
    color = "#46759c";
    label = "Cooling Limit";
    position = "end";
  }

  // --------------------------------------------------------------------------
  // Component
  if (props.value === undefined) {
    return <></>;
  }
  return (
    <ChartsReferenceLine
      y={props.value}
      lineStyle={{ strokeDasharray: "10 5", stroke: color, strokeWidth: "2" }}
      labelStyle={{ fontSize: "0.6em", fill: color, fontWeight: "bold" }}
      label={label}
      labelAlign={position}
    />
  );
}

export default PhiusLimitLine;
