// Functions for use when building DataGrid
import { GridColDef } from "@mui/x-data-grid";

type TableField = {
  field: string;
  headerName: string;
  flex?: number;
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
