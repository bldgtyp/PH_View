import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, Modal, Tab } from "@mui/material";
import { generateDefaultRow } from "./DataGridItems";
import fetchData from "../fetchAirTable";
import { useNavigate, useLocation } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

// ----------------------------------------------------------------------------
// Define the AirTable data types
type SummaryFields = {
  CATEGORY: string;
  MISSING_DATASHEETS: number;
  MISSING_SPECS: number;
  NOTES: string;
};

type SummaryRecord = {
  id: string;
  createdTime: string;
  fields: SummaryFields;
};

/**
 * Converts a category name to a display name ("PUMPS" --> "Pumps").
 * Replaces underscores with spaces, converts to lowercase, and capitalizes the first letter of each word.
 * @param categoryName - The category name to convert.
 * @returns The converted display name.
 */
function makeDisplayName(categoryName: string) {
  return categoryName
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, function (c) {
      return c.toUpperCase();
    });
}

function makeCategoryCell(categoryName: string, location: any) {
  const projectID: string = location.pathname.split("/")[1];
  const baseURL = "#/" + projectID + "/";

  const refs: Record<string, string> = {
    ERV_UNITS: "ventilation",
    FANS: "fans",
    PUMPS: "pumps",
    LIGHTING_FIXTURES: "lighting",
    APPLIANCES: "appliances",
    MATERIAL_LAYERS: "materials",
    GLAZING_TYPES: "glazing-types",
    FRAME_TYPES: "frame-types",
  };

  return <a href={baseURL + refs[categoryName]}>{makeDisplayName(categoryName)}</a>;
}

// --------------------------------------------------------------------------
// Define the rows and columns

const tableFields = [
  {
    field: "category",
    headerName: "Category",
  },
  {
    field: "missing_specs",
    headerName: "Specs. Needed",
  },
  {
    field: "missing_datasheets",
    headerName: "Datasheets Needed",
  },
  {
    field: "notes",
    headerName: "Notes",
  },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const defaultRow = generateDefaultRow(tableFields);

function SummaryDataGrid() {
  let { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [rowData, setRowData] = useState<Array<SummaryRecord>>(defaultRow);
  const location = useLocation();

  useEffect(() => {
    // Show modal if loading takes longer than 1s
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    // Fetch the data from AirTable
    const fetchProjectData = async () => {
      const fetchedData = await fetchData(`${projectId}/summary`);
      const newRows = fetchedData.map((item: SummaryRecord) => {
        return {
          id: item.id,
          category: item.fields.CATEGORY,
          missing_specs: item.fields.MISSING_SPECS,
          missing_datasheets: item.fields.MISSING_DATASHEETS,
          notes: item.fields.NOTES,
        };
      });

      // ---Cleanup
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
        <h3>Items Needed to Complete Passive House Certification:</h3>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid black" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid black" }}>Specs. Needed</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid black" }}>Datasheets Needed</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: "2px solid black" }}>Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowData.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell sx={{ fontWeight: 600, "& a:visited": { color: "black" } }} align="left">
                  {makeCategoryCell(row.category, location)}
                </TableCell>
                <TableCell align="center">{row.missing_specs}</TableCell>
                <TableCell align="center">{row.missing_datasheets}</TableCell>
                <TableCell align="left">{row.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SummaryDataGrid;
