import { useState, useEffect } from "react";
import { Stack, Box } from "@mui/material";
import { InfoTooltipCell, generateDefaultRow } from "./DataGridItems";
import fetchData from "../fetchAirTable";
import { apiUrlCertResult } from "../../config";
import ContentBlock from "../ContentBlock";
import ResultDataGrid from "./CertResultsDataGrids";
import CertificationResultGraphs from "../Graphs/GraphCertificationResults";

// ----------------------------------------------------------------------------
// Define the AirTable and DataGrid types
type CertResultFields = {
  DISPLAY_NAME: string;
  UNIT: string;
  TYPE: string;
  [key: string]: any; // arbitrary number of dated result / target fields
};

type CertResultRecord = { id: string; createdTime: string; fields: CertResultFields };

type DataGridRow = {
  key: string;
  id: string;
  display_name: string;
  unit: string;
  [key: string]: any;
};

// ----------------------------------------------------------------------------
// Define the starting Columns and Default Row
const tableFields = [
  {
    key: "display_name",
    field: "Name",
    headerName: "ID",
    flex: 1,
    renderCell: (params: any) => InfoTooltipCell(params),
  },
  {
    key: "unit",
    field: "units",
    headerName: "Unit",
    flex: 1,
  },
  {
    key: "type",
    field: "type",
    headerName: "Type",
    flex: 1,
  },
];

// Create the columns object based on tableFields and then
// create an Array with a default single row, with all '-' cells.
// This will display while the data is being fetched
const defaultRow = generateDefaultRow(tableFields);

// ----------------------------------------------------------------------------
/**
 * Creates row data array for the CertificationResultsDataGrid component.
 * @param data An array of CertResultFields objects from AirTable.
 * @returns An array of row data objects.
 */
function createRowDataArray(data: CertResultFields[]) {
  return data.map((item: CertResultFields) => {
    const newRow: DataGridRow = {
      key: item.id,
      id: item.id,
      display_name: item.fields.DISPLAY_NAME,
      unit: item.fields.UNIT,
      type: item.fields.TYPE,
    };

    // Add in the dated 'result' fields, if any
    for (const [key, value] of Object.entries(item.fields)) {
      if (key.includes("RESULT")) {
        newRow[key] = value;
      }
    }
    return newRow;
  });
}

// ----------------------------------------------------------------------------
function CertResultDataGrid() {
  const [siteEnergyRowData, setSiteEnergyData] = useState<Array<DataGridRow>>(defaultRow);
  const [sourceEnergyRowData, setSourceEnergyData] = useState<Array<DataGridRow>>(defaultRow);
  const [heatingDemandRowData, setHeatingDemandData] = useState<Array<DataGridRow>>(defaultRow);
  const [coolingDemandRowData, setCoolingDemandData] = useState<Array<DataGridRow>>(defaultRow);
  const [heatingLoadRowData, setHeatingLoadData] = useState<Array<DataGridRow>>(defaultRow);
  const [coolingLoadRowData, setCoolingLoadData] = useState<Array<DataGridRow>>(defaultRow);

  useEffect(() => {
    // Fetch the data from AirTable and build up the new DataGrid rows
    fetchData(apiUrlCertResult).then((d: Record<any, any>) => {
      // ----------------------------------------------------------------------
      // Break out the data out into separate Objects by its 'type' attribute
      // ----------------------------------------------------------------------
      const siteEnergyData: CertResultFields[] = d.filter(
        (item: CertResultFields) => item.fields.TYPE === "SITE_ENERGY"
      );
      const sourceEnergyData: CertResultFields[] = d.filter(
        (item: CertResultFields) => item.fields.TYPE === "SOURCE_ENERGY"
      );
      const heatingDemandData: CertResultFields[] = d.filter(
        (item: CertResultFields) => item.fields.TYPE === "HEATING_DEMAND"
      );
      const coolingDemandData: CertResultFields[] = d.filter(
        (item: CertResultFields) => item.fields.TYPE === "COOLING_DEMAND"
      );
      const heatingLoadData: CertResultFields[] = d.filter(
        (item: CertResultFields) => item.fields.TYPE === "PEAK_HEATING_LOAD"
      );
      const coolingLoadData: CertResultFields[] = d.filter(
        (item: CertResultFields) => item.fields.TYPE === "PEAK_COOLING_LOAD"
      );

      // ----------------------------------------------------------------------
      // Build all of the new Rows
      // ----------------------------------------------------------------------
      const newSiteEnergyRows: DataGridRow[] = createRowDataArray(siteEnergyData);
      const newSourceEnergyRows: DataGridRow[] = createRowDataArray(sourceEnergyData);
      const newHeatingDemandRows: DataGridRow[] = createRowDataArray(heatingDemandData);
      const newCoolingDemandRows: DataGridRow[] = createRowDataArray(coolingDemandData);
      const newHeatingLoadRows: DataGridRow[] = createRowDataArray(heatingLoadData);
      const newCoolingLoadRows: DataGridRow[] = createRowDataArray(coolingLoadData);

      // ----------------------------------------------------------------------
      // Set the row state
      // ----------------------------------------------------------------------
      newSiteEnergyRows.length > 0 ? setSiteEnergyData(newSiteEnergyRows) : setSiteEnergyData(defaultRow);
      newSourceEnergyRows.length > 0 ? setSourceEnergyData(newSourceEnergyRows) : setSourceEnergyData(defaultRow);
      newHeatingDemandRows.length > 0 ? setHeatingDemandData(newHeatingDemandRows) : setHeatingDemandData(defaultRow);
      newCoolingDemandRows.length > 0 ? setCoolingDemandData(newCoolingDemandRows) : setCoolingDemandData(defaultRow);
      newHeatingLoadRows.length > 0 ? setHeatingLoadData(newHeatingLoadRows) : setHeatingLoadData(defaultRow);
      newCoolingLoadRows.length > 0 ? setCoolingLoadData(newCoolingLoadRows) : setCoolingLoadData(defaultRow);
    });
  }, []);

  // --------------------------------------------------------------------------
  // Render the component
  return (
    <>
      <ContentBlock>
        <Stack direction="row" spacing={3}>
          <CertificationResultGraphs title="Annual Source Energy [kWh/a]" data={sourceEnergyRowData} variant="energy" />
          <CertificationResultGraphs
            title="Annual Energy Demands [kBtu/a]"
            data={[...heatingDemandRowData, ...coolingDemandRowData]}
            variant="demand"
          />
          <CertificationResultGraphs
            title="Peak Loads [Btu/h]"
            data={[...heatingLoadRowData, ...coolingLoadRowData]}
            variant="load"
          />
        </Stack>
      </ContentBlock>
      <ContentBlock>
        <ResultDataGrid title="Annual Source Energy" rowData={sourceEnergyRowData} />
      </ContentBlock>
      <ContentBlock>
        <ResultDataGrid title="Annual Heating Demand" rowData={heatingDemandRowData} />
      </ContentBlock>
      <ContentBlock>
        <ResultDataGrid title="Annual Cooling Demand" rowData={coolingDemandRowData} />
      </ContentBlock>
      <ContentBlock>
        <ResultDataGrid title="Peak Heating Load" rowData={heatingLoadRowData} />
      </ContentBlock>
      <ContentBlock>
        <ResultDataGrid title="Peak Cooling Load" rowData={coolingLoadRowData} />
      </ContentBlock>
    </>
  );
}

export default CertResultDataGrid;
