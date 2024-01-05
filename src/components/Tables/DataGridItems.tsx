// Functions for use when building DataGrid
import { Tooltip, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import LinkIcon from "@mui/icons-material/Link";
import InfoIcon from "@mui/icons-material/Info";

/**
 * Hover-over tooltip:
 * Renders a tooltip header component.
 * @param params - The parameters for the tooltip header.
 * @param title - The title of the tooltip header.
 * @returns The rendered tooltip header component.
 */
export const TooltipHeader = (params: any, title: string) => (
  <Tooltip title={title}>
    <span>{params.colDef.headerName}</span>
  </Tooltip>
);

/**
 * Styled Checkbox:
 * Renders a checkbox cell in a data grid.
 * @param params - The parameters for the checkbox cell.
 * @returns The rendered checkbox cell.
 */
export const datasheetCheckbox = (params: { value?: string }) => (
  <input type="checkbox" checked={params.value ? true : false} readOnly className="checkbox" />
);

/**
 * Applies a specific style to a data sheet checkbox based on the provided value.
 * @param value - The value to determine the style for.
 */
function specificationCheckboxStyle(value: string | undefined) {
  if (value === "NEEDED") {
    return { checked: false, style: "checkbox-needed" };
  } else if (value === "COMPLETE") {
    return { checked: true, style: "checkbox" };
  } else if (value === "QUESTION") {
    return { checked: false, style: "checkbox-question" };
  }
  return { checked: false, style: "checkbox-na" };
}

export const specificationCheckbox = (params: { value?: string }) => {
  const { checked, style } = specificationCheckboxStyle(params.value);

  return <input type="checkbox" checked={checked} className={style} />;
};

/**
 * Link Cell:
 * Renders a cell with a link or default text if none is found.
 * @param params - The parameters for the cell.
 * @returns The rendered link cell.
 */
export const LinkCell = (params: { value?: string }) => {
  if (params.value) {
    return (
      <a href={params.value as string} target="_blank" rel="noopener noreferrer">
        <LinkIcon />
      </a>
    );
  } else {
    return "-";
  }
};

/**
 * Renders an info tooltip cell in the data grid with icon.
 * @param params - The parameters for the cell.
 * @returns The rendered info tooltip cell.
 */
export const InfoTooltipCell = (params: any) =>
  params.row.notes ? (
    <Tooltip title={params.row.notes}>
      <Stack direction="row" spacing={1}>
        <InfoIcon className="critical-info-icon" fontSize="small" />
        <div>{params.value}</div>
      </Stack>
    </Tooltip>
  ) : (
    params.value
  );

type TableField = {
  field: string;
  headerName: string;
  flex: number;
  renderCell?: any;
  renderHeader?: any;
};
/**
 * Generates grid columns based on the provided table fields.
 * Used when setting up a new DataGrid page
 *
 * @param tableFields The table fields used to generate the grid columns.
 * @returns An array of GridColDef representing the generated grid columns.
 */
export function generateGridColumns(tableFields: Array<TableField>): GridColDef[] {
  return tableFields.map((item: TableField) => {
    // Build the basic column object
    const column: Partial<GridColDef> = {
      field: item.field,
      headerName: item.headerName,
      flex: item.flex,
    };

    // Add the renderCell, if it exists
    if (item.renderCell) {
      column["renderCell"] = item.renderCell;
    }

    // Add the renderHeader, if it exists
    if (item.renderHeader) {
      column["renderHeader"] = item.renderHeader;
    }

    return column as GridColDef;
  });
}

/**
 * Generates a default row for the data grid.
 * Used when setting up a new DataGrid page before data is fetched.
 *
 * @param tableFields - The table fields used to generate the default row.
 * @returns An array with one default row in it.
 */
export function generateDefaultRow(tableFields: Array<TableField>): Array<any> {
  const defaultRow = tableFields.reduce((acc, key) => {
    return { ...acc, id: "-", [key.field]: "-" };
  }, {});
  return [defaultRow];
}
