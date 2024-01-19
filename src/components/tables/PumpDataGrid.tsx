import { useParams } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import { generateGridColumns, generateDefaultRow } from "../common/DataGridFunctions";
import { TooltipWithInfo } from "../common/TooltipWithInfo";
import { TooltipWithComment } from "../common/TooltipWithComment";
import { TooltipHeader } from "../common/TooltipHeader";
import LoadingModal from "../common/LoadingModal";
import useLoadDataGridFromAirTable from "../../hooks/useLoadDataGridFromAirTable";

// ----------------------------------------------------------------------------
// Define the AirTable data types
type PumpsFields = {
  DISPLAY_NAME: string;
  MANUFACTURER: string;
  MODEL: string;
  DATA_SHEET: string;
  SPECIFICATION: string;
};

type PumpsRecord = { id: string; createdTime: string; fields: PumpsFields };

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
    field: "SPECIFICATION",
    headerName: "Specification",
    flex: 1,
    renderHeader: (params: any) => TooltipHeader(params, "Do we have a product specification? Yes/No"),
    renderCell: (params: any) => parseFloat(params.value).toFixed(1),
  },
  {
    field: "DATA_SHEET",
    headerName: "Data Sheet",
    flex: 1,
    renderHeader: (params: any) => TooltipHeader(params, "Do we have a product data-sheet? Yes/No"),
    renderCell: (params: any) => parseFloat(params.value).toFixed(1),
  },
  { field: "MANUFACTURER", headerName: "Manufacturer", flex: 1 },
  { field: "MODEL", headerName: "Model", flex: 1 },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const columns = generateGridColumns(tableFields);
const defaultRow = generateDefaultRow(tableFields);

// ----------------------------------------------------------------------------
function PumpsDataGrid() {
  // Load in the table data from the Database
  const { projectId } = useParams();
  const { showModal, rowData } = useLoadDataGridFromAirTable<PumpsRecord>(defaultRow, "pumps", projectId);

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      {" "}
      <LoadingModal showModal={showModal} />
      <Stack className="content-block-heading" spacing={1}>
        <h3>Pumps:</h3>
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

export default PumpsDataGrid;
