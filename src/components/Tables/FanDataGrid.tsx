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
  generateGridColumns,
  generateDefaultRow,
  specificationCheckbox,
} from "./DataGridItems";
import fetchData from "../fetchAirTable";
import { apiUrlFans } from "../../config";

// ----------------------------------------------------------------------------
// Define the AirTable data types
type FanFields = {
  DISPLAY_NAME: string;
  QUANTITY: number;
  ID_NUMBER: string;
  SERVICE: string;
  LOCATION: string;
  MANUFACTURER: string;
  MODEL: string;
  CFM: number;
  "VOLTS [V]": number;
  HP: number;
  "AMPS [A]": number;
  "ENERGY DEMAND [W]": number;
  LINK: string;
  SPECIFICATION: boolean;
  DATA_SHEET: string;
  NOTES: string;
  FLAG: string;
};

type FanRecord = { id: string; createdTime: string; fields: FanFields };

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
  { field: "manufacturer", headerName: "Manufacturer", flex: 1 },
  { field: "model", headerName: "Model", flex: 1 },
  { field: "service", headerName: "Service", flex: 1 },
  { field: "link", headerName: "Link", flex: 1, renderCell: (params: any) => LinkCell(params) },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const columns = generateGridColumns(tableFields);
const defaultRow = generateDefaultRow(tableFields);

// ----------------------------------------------------------------------------
function FanDataGrid() {
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState<Array<FanRecord>>(defaultRow);

  useEffect(() => {
    // Show modal if loading takes longer than 1s
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    // Fetch the data from AirTable
    fetchData(apiUrlFans).then((fetchedData) => {
      const newRows = fetchedData.map((item: any) => {
        item = datasheetRequired(item);
        return {
          id: item.id,
          identifier: item.fields.ID_NUMBER,
          name: item.fields.DISPLAY_NAME,
          manufacturer: item.fields.MANUFACTURER,
          model: item.fields.MODEL,
          service: item.fields.SERVICE,
          link: item.fields.LINK,
          specification: item.fields.SPECIFICATION,
          data_sheet: item.fields.DATA_SHEET,
          notes: item.fields.NOTES,
          flag: item.fields.FLAG,
        };
      });

      // Cleanup
      newRows.length > 0 ? setRowData(newRows) : setRowData(defaultRow);
      clearTimeout(timerId);
      setShowModal(false);
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
        <h3>Fans:</h3>
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

export default FanDataGrid;
