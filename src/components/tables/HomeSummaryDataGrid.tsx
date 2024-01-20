import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { useLocation } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../../styles/HomeSummaryTable.css";
import { generateDefaultRow } from "../common/DataGridFunctions";
import LoadingModal from "../common/LoadingModal";
import useLoadDataGridFromAirTable from "../../hooks/useLoadDataGridFromAirTable";
import ValueAsSentenceCase from "../../formatters/ValueAsSentenceCase";

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
 * Creates a table cell with a link based on the category name and location.
 * @param categoryName - The name of the category.
 * @param location - The location object.
 * @returns A table cell element with a link.
 */
function createTableCellWithLink(categoryName: string, location: any) {
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
    DHW_TANKS: "hot-water-tanks",
  };

  return <a href={baseURL + refs[categoryName]}>{ValueAsSentenceCase(categoryName)}</a>;
}

// --------------------------------------------------------------------------
// Define the rows and columns

const tableFields = [
  {
    field: "CATEGORY",
    headerName: "Category",
  },
  {
    field: "MISSING_SPECS",
    headerName: "Specs. Needed",
  },
  {
    field: "MISSING_DATASHEETS",
    headerName: "Datasheets Needed",
  },
  {
    field: "NOTES",
    headerName: "Notes",
  },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const defaultRow = generateDefaultRow(tableFields);

function HomeSummaryDataGrid() {
  // Load in the table data from the Database
  const location = useLocation();
  const { projectId } = useParams();
  const { showModal, rowData } = useLoadDataGridFromAirTable<SummaryRecord>(defaultRow, "summary", projectId);

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      {" "}
      <LoadingModal showModal={showModal} />
      <Stack className="content-block-heading" spacing={1}>
        <h3>Items Needed to Complete Passive House Certification:</h3>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="summary-cell-header">Category</TableCell>
              <TableCell align="center" width="200" className="summary-cell-header">
                Specs. Needed
              </TableCell>
              <TableCell align="center" width="200" className="summary-cell-header">
                Datasheets Needed
              </TableCell>
              <TableCell className="summary-cell-header">Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="summary-table">
            {rowData.map((row: any) => (
              <TableRow key={row.id}>
                <TableCell sx={{ fontWeight: 600, "& a:visited": { color: "black" } }} align="left">
                  {createTableCellWithLink(row.CATEGORY, location)}
                </TableCell>
                <TableCell align="center" className="summary-cell">
                  <div className={row.MISSING_SPECS !== 0 ? "summary-cell-missing" : "summary-cell-done"}>
                    {row.MISSING_SPECS}
                  </div>
                </TableCell>
                <TableCell align="center" className="summary-cell">
                  <div className={row.MISSING_DATASHEETS !== 0 ? "summary-cell-missing" : "summary-cell-done"}>
                    {row.MISSING_DATASHEETS}
                  </div>
                </TableCell>
                <TableCell align="left" className="summary-cell">
                  {row.NOTES}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default HomeSummaryDataGrid;
