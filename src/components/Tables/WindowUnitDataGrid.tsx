import { useParams } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import { generateGridColumns, generateDefaultRow } from "../common/DataGridFunctions";
import { TooltipWithInfo } from "../common/TooltipWithInfo";
import { ValueAsDecimal } from "../../formatters/ValueAsDecimal";
import { TooltipWithComment } from "../common/TooltipWithComment";
import LoadingModal from "../common/LoadingModal";
import useLoadDataGridFromAirTable from "../../hooks/useLoadDataGridFromAirTable";

// ----------------------------------------------------------------------------
// Define the AirTable data types
type WindowUnitTypesFields = {
  DISPLAY_NAME: string;
  "WIDTH [FT-IN]": string;
  "HEIGHT [FT-IN]": string;
  OPERATION: string;
  USE_TYPE: string;
  GLAZING_NAME: string;
  "FRAME ELEMENT NAME: LEFT": string;
  "FRAME ELEMENT NAME: RIGHT": string;
  "FRAME ELEMENT NAME: TOP": string;
  "FRAME ELEMENT NAME: BOTTOM": string;
};

type WindowUnitTypesRecord = { id: string; createdTime: string; fields: WindowUnitTypesFields };

// --------------------------------------------------------------------------
// Define the rows and columns
const tableFields = [
  {
    field: "DISPLAY_NAME",
    headerName: "ID",
    flex: 1,
    renderCell: (params: any) => TooltipWithInfo(params),
  },
  {
    field: "NOTES",
    headerName: "Notes",
    flex: 0.5,
    renderCell: (params: any) => TooltipWithComment(params),
  },
  {
    field: "WIDTH [FT-IN]",
    headerName: "Width",
    flex: 1,
    renderCell: (params: any) => {
      return ValueAsDecimal(params, 2);
    },
  },
  {
    field: "HEIGHT [FT-IN]",
    headerName: "Height",
    flex: 1,
    renderCell: (params: any) => {
      return ValueAsDecimal(params, 2);
    },
  },
  { field: "OPERATION", headerName: "Operation", flex: 1 },
  { field: "USE_TYPE", headerName: "Use Type", flex: 1 },
  { field: "GLAZING_NAME", headerName: "Glazing", flex: 1 },
  { field: "FRAME ELEMENT NAME: LEFT", headerName: "Frame: Left", flex: 1 },
  { field: "FRAME ELEMENT NAME: RIGHT", headerName: "Frame: Right", flex: 1 },
  { field: "FRAME ELEMENT NAME: TOP", headerName: "Frame: Top", flex: 1 },
  { field: "FRAME ELEMENT NAME: BOTTOM", headerName: "Frame: Bottom", flex: 1 },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const columns = generateGridColumns(tableFields);
const defaultRow = generateDefaultRow(tableFields);

// ----------------------------------------------------------------------------
function WindowUnitDataGrid() {
  // Load in the table data from the Database
  const { projectId } = useParams();
  const { showModal, rowData } = useLoadDataGridFromAirTable(defaultRow, "window_unit_types", projectId);

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      {" "}
      <LoadingModal showModal={showModal} />
      <Stack className="content-block-heading" spacing={1}>
        <h3>Window Unit Types:</h3>
      </Stack>
      <Box>
        <StyledDataGrid
          rows={rowData}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 100]}
          checkboxSelection
        />
      </Box>
    </>
  );
}

export default WindowUnitDataGrid;
