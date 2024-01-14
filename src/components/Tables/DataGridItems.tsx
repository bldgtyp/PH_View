// Functions for use when building DataGrid
import { Tooltip, Stack } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import LinkIcon from "@mui/icons-material/Link";
import InfoIcon from "@mui/icons-material/Info";
import CommentIcon from "@mui/icons-material/Comment";

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
 * Renders a cell with a notes icon.
 * @param params - The parameters for the cell.
 */
export const notesCell = (params: any) => {
  // return <div className="notes-cell"></div>;
  if (params.row.notes) {
    return (
      <Tooltip title={params.row.notes}>
        <Stack direction="row" spacing={1}>
          <CommentIcon className="notes-icon" fontSize="medium" />
        </Stack>
      </Tooltip>
    );
  } else {
    return <div>-</div>;
  }
};

// ----------------------------------------------------------------------------
// Check Box: Data Sheet
// ----------------------------------------------------------------------------

/**
 * Checks if the item has required datasheet.
 * @param item - The item to check.
 * @returns a copy of the item with the datasheet required field set.
 */
export const datasheetRequired = (item: { id: string; fields: any }) => {
  let itemCopy = { ...item };

  let datasheetRequired = false;
  if (itemCopy.fields.SPECIFICATION && itemCopy.fields.SPECIFICATION !== "NA") {
    datasheetRequired = true;
  }

  // If the Datasheet in AT is not there, will get undefined...
  if (itemCopy.fields.DATA_SHEET) {
    itemCopy.fields.DATA_SHEET[0].required = datasheetRequired;
  } else {
    itemCopy.fields.DATA_SHEET = [{ url: "", required: datasheetRequired }];
  }

  return itemCopy;
};

type datasheetCheckboxParams = {
  url: string;
  required: boolean;
};

/**
 * Renders a checkbox with a link for each item in the data sheet.
 * @param params - An array of parameters for each item.
 * @param params.url - The url for the link.
 */
function datasheetCheckboxWithLink(params: datasheetCheckboxParams) {
  return (
    <Stack direction="row" spacing={1}>
      <div className="checkbox-checked" />
      {params.url && (
        <a href={params.url} target="_blank" rel="noopener noreferrer">
          <LinkIcon />
        </a>
      )}
    </Stack>
  );
}

/**
 * Renders a checkbox for the datasheet item.
 * @param params - The parameters for the checkbox.
 * @param params.value - The value of the checkbox.
 */
export const datasheetCheckbox = (params: { value?: datasheetCheckboxParams[] }) => {
  if (params.value === undefined || params.value.length === 0) {
    return <div className="checkbox-na" />;
  }

  if (params.value[0].required === false) {
    return <div className="checkbox-na" />;
  }

  if (params.value[0].required === true) {
    if (params.value[0].url === "") {
      return <div className="checkbox-needed" />;
    } else {
      return datasheetCheckboxWithLink(params.value[0]);
    }
  }
};

// ----------------------------------------------------------------------------
// Check Box: Specification
// ----------------------------------------------------------------------------
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

export const specificationCheckbox = (params: { value?: string; row: any }) => {
  const { style } = specificationCheckboxStyle(params.value);
  return (
    <Tooltip title={params.row.flag}>
      <div className={style} />
    </Tooltip>
  );
};

// ----------------------------------------------------------------------------
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
  params.row.flag ? (
    <Tooltip title={params.row.flag}>
      <Stack direction="row" spacing={1}>
        <InfoIcon className="critical-info-icon" fontSize="medium" />
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
 * Create the columns object based on tableFields and then
 * create an Array with a default single row, with all '-' cells.
 * This will display while the data is being fetched.
 * Used when setting up a new DataGrid page.
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
