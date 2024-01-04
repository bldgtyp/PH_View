// Functions for use when building DataGrid
import { Tooltip } from "@mui/material";
import LinkIcon from "@mui/icons-material/Link";

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
export const CheckboxCell = (params: { value?: string }) => (
  <input type="checkbox" checked={params.value ? true : false} readOnly className="have-doc-checkbox" />
);

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
