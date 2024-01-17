import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Modal } from "@mui/material";
import StyledDataGrid from "../../styles/DataGrid";
import { notesCell, TooltipHeader, InfoTooltipCell, generateGridColumns, generateDefaultRow } from "./DataGridItems";
import fetchData from "../fetchAirTable";

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
    renderHeader: (params: any) => TooltipHeader(params, "Do we have a product specification? Yes/No"),
    renderCell: (params: any) => parseFloat(params.value).toFixed(1),
  },
  {
    field: "data_sheet",
    headerName: "Data Sheet",
    flex: 1,
    renderHeader: (params: any) => TooltipHeader(params, "Do we have a product data-sheet? Yes/No"),
    renderCell: (params: any) => parseFloat(params.value).toFixed(1),
  },
  { field: "manufacturer", headerName: "Manufacturer", flex: 1 },
  { field: "model", headerName: "Model", flex: 1 },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const columns = generateGridColumns(tableFields);
const defaultRow = generateDefaultRow(tableFields);

// ----------------------------------------------------------------------------
function PumpsDataGrid() {
  let { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState<Array<PumpsRecord>>(defaultRow);

  useEffect(() => {
    // Show modal if loading takes longer than 1s
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    // Fetch the data from AirTable
    const fetchProjectData = async () => {
      const fetchedData = await fetchData(`${projectId}/pumps`);
      const newRows = fetchedData.map((item: any) => ({
        id: item.id,
        identifier: item.fields.DISPLAY_NAME,
        specification: item.fields.SPECIFICATION,
        data_sheet: item.fields.DATA_SHEET,
        manufacturer: item.fields.MANUFACTURER,
        model: item.fields.MODEL,
      }));

      // Cleanup
      newRows.length > 0 ? setRowData(newRows) : setRowData(defaultRow);
      clearTimeout(timerId);
      setShowModal(false);
    };
    fetchProjectData();
  }, [projectId]);

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
