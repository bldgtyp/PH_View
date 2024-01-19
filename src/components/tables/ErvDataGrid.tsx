import { useParams } from "react-router-dom";
import { Box, Stack, Modal } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import { generateGridColumns, generateDefaultRow } from "../common/DataGridFunctions";
import { CheckboxForDatasheet } from "../common/CheckboxForDatasheet";
import { CheckboxForSpecification } from "../common/CheckboxForSpecification";
import { LinkIconWithDefault } from "../common/LinkIconWithDefault";
import { TooltipWithInfo } from "../common/TooltipWithInfo";
import { TooltipWithComment } from "../common/TooltipWithComment";
import { TooltipHeader } from "../common/TooltipHeader";
import LoadingModal from "../common/LoadingModal";
import useLoadDataGridFromAirTable from "../../hooks/useLoadDataGridFromAirTable";

// ----------------------------------------------------------------------------
// Define the AirTable data types
type ErvFields = {
  "AIRFLOW [CFM]": number;
  "DEFROST MIN TEMP [°F]": number;
  DISPLAY_NAME: string;
  "DUCT_ETA_SIZE [IN]": string;
  "DUCT_SUP_SIZE [IN]": string;
  "ELECTRICAL EFFICIENCY [W/CFM]": number;
  "ELECTRICAL_EFFICIENCY [W/CFM]": number;
  "ENERGY RECOVERY [%]": number;
  "ERV: RISERS": Array<string>;
  "HAS SUMMER BYPASS?": string;
  "HAVE AHRI TESTING?": string;
  "HAVE SPEC?": "No";
  "HEAT RECOVERY [%]": number;
  "IN CONDITIONED SPACE?": string;
  MANUFACTURER: string;
  MODEL: string;
  "Name (from ERV: RISERS)": Array<string>;
  "ROOMS SERVED": Array<string>;
  "WATTAGE [W]": number;
  "WINTER DEFROST PROTECTION?": string;
  LINK: string;
  SPECIFICATION: boolean;
  DATA_SHEET: string;
  NOTES: string;
  FLAG: string;
};

type ErvRecord = {
  id: string;
  createdTime: string;
  fields: ErvFields;
};

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
    renderCell: (params: any) => CheckboxForSpecification(params),
    renderHeader: (params: any) => TooltipHeader(params, "Do we have a product specification? Yes/No"),
  },
  {
    field: "DATA_SHEET",
    headerName: "Data Sheet",
    flex: 1,
    renderCell: (params: any) => CheckboxForDatasheet(params),
    renderHeader: (params: any) =>
      TooltipHeader(params, "Do we have a PDF data-sheet with the product's performance values? Yes/No"),
  },
  { field: "MANUFACTURER", headerName: "Manuf.", flex: 1 },
  { field: "MODEL", headerName: "Model", flex: 1 },
  {
    field: "HEAT RECOVERY [%]",
    headerName: "HR [%]",
    flex: 1,
    valueFormatter: (params: any) => {
      const value = params.value as number;
      return `${Math.round(value * 100)}%`;
    },
    renderHeader: (params: any) => TooltipHeader(params, "Heat Recovery Efficiency"),
  },
  {
    field: "ENERGY RECOVERY [%]",
    headerName: "ER [%]",
    flex: 1,
    valueFormatter: (params: any) => {
      const value = params.value as number;
      return `${Math.round(value * 100)}%`;
    },
    renderHeader: (params: any) => TooltipHeader(params, "Energy/Moisture Recovery Efficiency"),
  },
  {
    field: "LINK",
    headerName: "Link",
    flex: 1,
    renderCell: (params: any) => LinkIconWithDefault(params),
  },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const columns = generateGridColumns(tableFields);
const defaultRow = generateDefaultRow(tableFields);

function ErvDataGrid() {
  // Load in the table data from the Database
  const { projectId } = useParams();
  const { showModal, rowData } = useLoadDataGridFromAirTable<ErvRecord>(defaultRow, "erv_units", projectId);

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      {" "}
      <LoadingModal showModal={showModal} />
      <Stack className="content-block-heading" spacing={1}>
        <h3>ERV Units:</h3>
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

export default ErvDataGrid;
