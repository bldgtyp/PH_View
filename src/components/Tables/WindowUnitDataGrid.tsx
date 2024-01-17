import { useState, useEffect } from "react";
import { Box, Stack, Modal } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import { decimalCell, notesCell, InfoTooltipCell, generateGridColumns, generateDefaultRow } from "./DataGridItems";
import fetchData from "../fetchAirTable";
import { apiUrlWindowUnitTypes } from "../../config";

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
    field: "width",
    headerName: "Width",
    flex: 1,
    renderCell: (params: any) => {
      return decimalCell(params, 2);
    },
  },
  {
    field: "height",
    headerName: "Height",
    flex: 1,
    renderCell: (params: any) => {
      return decimalCell(params, 2);
    },
  },
  { field: "operation", headerName: "Operation", flex: 1 },
  { field: "useType", headerName: "Use Type", flex: 1 },
  { field: "glazing", headerName: "Glazing", flex: 1 },
  { field: "frame_left", headerName: "Frame: Left", flex: 1 },
  { field: "frame_right", headerName: "Frame: Right", flex: 1 },
  { field: "frame_top", headerName: "Frame: Top", flex: 1 },
  { field: "frame_bottom", headerName: "Frame: Bottom", flex: 1 },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const columns = generateGridColumns(tableFields);
const defaultRow = generateDefaultRow(tableFields);

// ----------------------------------------------------------------------------
function WindowUnitDataGrid() {
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState<Array<WindowUnitTypesRecord>>(defaultRow);

  useEffect(() => {
    // Show modal if loading takes longer than 1s
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    // Fetch the data from AirTable
    fetchData(apiUrlWindowUnitTypes).then((fetchedData) => {
      const newRows = fetchedData.map((item: any) => ({
        id: item.id,
        identifier: item.fields.DISPLAY_NAME,
        width: item.fields["WIDTH [FT-IN]"],
        height: item.fields["HEIGHT [FT-IN]"],
        operation: item.fields.OPERATION,
        useType: item.fields.USE_TYPE,
        glazing: item.fields.GLAZING_NAME,
        frame_left: item.fields["FRAME ELEMENT NAME: LEFT"],
        frame_right: item.fields["FRAME ELEMENT NAME: RIGHT"],
        frame_top: item.fields["FRAME ELEMENT NAME: TOP"],
        frame_bottom: item.fields["FRAME ELEMENT NAME: BOTTOM"],
      }));

      // ---Cleanup
      newRows.length > 0 ? setRowData(newRows) : setRowData(defaultRow);
      clearTimeout(timerId);
      setShowModal(false);
    });
  }, []);

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      {showModal ? (
        <Modal open={showModal}>
          <Box className="modal-box-loading">Loading Project Data...</Box>
        </Modal>
      ) : null}
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
