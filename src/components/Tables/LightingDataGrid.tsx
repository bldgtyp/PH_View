import { useState, useEffect } from "react";
import { Box, Stack, Modal } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import {
  notesCell,
  datasheetRequired,
  TooltipHeader,
  datasheetCheckbox,
  LinkCell,
  InfoTooltipCell,
  specificationCheckbox,
} from "./DataGridItems";
import fetchData from "../fetchAirTable";
import { apiUrlLighting } from "../../config";
import { generateGridColumns, generateDefaultRow } from "./DataGridItems";

// ----------------------------------------------------------------------------
// Define the AirTable data types
type LightingFields = {
  DISPLAY_NAME: string;
  ZONE: string;
  ENERGY_STAR: string;
  WATTS: number;
  LUMENS: number;
  SPECIFICATION: boolean;
  DATA_SHEET: string;
  LINK: string;
  NOTES: string;
  FLAG: string;
};

type LightingRecord = { id: string; createdTime: string; fields: LightingFields };

// ----------------------------------------------------------------------------
// Define the table columns and rows to display
const tableFields = [
  {
    field: "identifier",
    headerName: "ID",
    flex: 1,
    renderCell: (params: any) => InfoTooltipCell(params),
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 0.5,
    renderCell: (params: any) => notesCell(params),
  },
  {
    field: "specification",
    headerName: "Specification",
    flex: 1,
    renderCell: (params: any) => specificationCheckbox(params),
    renderHeader: (params: any) => TooltipHeader(params, "Do we have a product specification? Yes/No"),
  },
  {
    field: "data_sheet",
    headerName: "Data Sheet",
    flex: 1,
    renderCell: (params: any) => datasheetCheckbox(params),
    renderHeader: (params: any) =>
      TooltipHeader(params, "Do we have a PDF data-sheet with the product's performance values? Yes/No"),
  },
  { field: "watts", headerName: "Watts", flex: 1 },
  { field: "lumens", headerName: "Lumens", flex: 1 },
  { field: "zone", headerName: "Zone", flex: 1 },
  { field: "energy_star", headerName: "EnergyStar", flex: 1 },
  {
    field: "link",
    headerName: "Link",
    flex: 1,
    renderCell: (params: any) => LinkCell(params),
  },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const columns = generateGridColumns(tableFields);
const defaultRow = generateDefaultRow(tableFields);

// ----------------------------------------------------------------------------
function LightingDataGrid() {
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState<Array<LightingRecord>>(defaultRow);

  useEffect(() => {
    // Show modal if loading takes longer than 250ms
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 500);

    // Fetch the data from AirTable
    fetchData(apiUrlLighting).then((fetchedData) => {
      const newRows = fetchedData.map((item: any) => {
        item = datasheetRequired(item);
        return {
          id: item.id,
          identifier: item.fields.DISPLAY_NAME,
          watts: item.fields.WATTS,
          lumens: item.fields.LUMENS,
          energy_star: item.fields.ENERGY_STAR,
          zone: item.fields.ZONE,
          link: item.fields.LINK,
          specification: item.fields.SPECIFICATION,
          data_sheet: item.fields.DATA_SHEET,
          notes: item.fields.NOTES,
          flag: item.fields.FLAG,
        };
      });

      // Cleanup
      newRows.length > 0 ? setRowData(newRows) : setRowData(defaultRow);
      clearTimeout(timerId); // Cancel the timeout
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    });
  }, []);

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      {" "}
      {showModal ? (
        <Modal open={showModal}>
          <Box className="modal-box-loading">Loading Project Data...</Box>
        </Modal>
      ) : null}
      <Stack className="content-block-heading" spacing={1}>
        <h3>Lighting Fixtures:</h3>
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

export default LightingDataGrid;
