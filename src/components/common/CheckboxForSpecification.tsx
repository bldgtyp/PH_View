import { Tooltip } from "@mui/material";

/**
 * Applies a specific style to a data sheet checkbox based on the provided value.
 * @param value - The value to determine the style for.
 */
function specificationCheckboxStyle(value?: string) {
  if (value === "NEEDED") {
    return { checked: false, style: "checkbox-needed" };
  } else if (value === "COMPLETE") {
    return { checked: true, style: "checkbox-checked" };
  } else if (value === "QUESTION") {
    return { checked: false, style: "checkbox-question" };
  }
  return { checked: false, style: "checkbox-na" };
}

/**
 * Renders a checkbox component for a specification.
 * @param params - The parameters for the checkbox component.
 * @param params.value - The value of the checkbox.
 * @param params.row - The row data for the checkbox.
 * @returns The rendered checkbox component.
 */
export const CheckboxForSpecification = (params: { value?: string; row: any }) => {
  const { style } = specificationCheckboxStyle(params.value);
  return (
    <Tooltip title={params.row.FLAG}>
      <div className={style} />
    </Tooltip>
  );
};
