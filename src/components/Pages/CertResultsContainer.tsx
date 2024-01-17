import { useState, useEffect } from "react";
import { Stack, Modal, Box } from "@mui/material";
import { InfoTooltipCell, generateDefaultRow } from "../Tables/DataGridItems";
import fetchData from "../fetchAirTable";
import { apiUrlCertResult } from "../../config";
import ContentBlock from "../ContentBlock";
import ResultDataGrid from "../Tables/CertResultsDataGrids";
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

const defaultLimits = {
  total: 0,
  heating: 0,
  cooling: 0,
};

function createAnnualEnergyLimits(sourceEnergyData: any[]) {
  // Pull out the "PHIUS_LIMIT" value from the "TOTAL [GROSS]" record
  let totalLimit: any = 0;
  const totalEnergyRecord: CertResultRecord[] = sourceEnergyData.filter(
    (item: CertResultRecord) => item.fields.DISPLAY_NAME === "TOTAL [GROSS]"
  );
  if (totalEnergyRecord && totalEnergyRecord.length > 0 && totalEnergyRecord[0].fields) {
    totalLimit = totalEnergyRecord[0].fields.PHIUS_LIMIT;
  }

  return {
    total: totalLimit,
    heating: 0,
    cooling: 0,
  };
}

function createDemandLimits(heatingData: any[], coolingData: any[]) {
  // Pull out the "PHIUS_LIMIT" value from the "HEAT DEMAND" record
  let heatingLimit: any = 0;
  const heatingDemandRecord: CertResultRecord[] = heatingData.filter(
    (item: CertResultRecord) => item.fields.DISPLAY_NAME === "HEAT DEMAND"
  );
  if (heatingDemandRecord && heatingDemandRecord.length > 0 && heatingDemandRecord[0].fields) {
    heatingLimit = heatingDemandRecord[0].fields.PHIUS_LIMIT;
  }

  // Pull out the "PHIUS_LIMIT" value from the "COOLING DEMAND" record
  let coolingLimit: any = 0;
  const coolingDemandRecord: CertResultRecord[] = coolingData.filter(
    (item: CertResultRecord) => item.fields.DISPLAY_NAME === "COOLING DEMAND [TOTAL]"
  );
  if (coolingDemandRecord && coolingDemandRecord.length > 0 && coolingDemandRecord[0].fields) {
    coolingLimit = coolingDemandRecord[0].fields.PHIUS_LIMIT;
  }

  return {
    total: 0,
    heating: heatingLimit,
    cooling: coolingLimit,
  };
}

function createLoadLimits(heatingData: any[], coolingData: any[]) {
  // Pull out the "PHIUS_LIMIT" value from the "PEAK HEAT LOAD" record
  let heatingLimit: any = 0;
  const heatingLoadRecord: CertResultRecord[] = heatingData.filter(
    (item: CertResultRecord) => item.fields.DISPLAY_NAME === "PEAK HEAT LOAD"
  );
  if (heatingLoadRecord && heatingLoadRecord.length > 0 && heatingLoadRecord[0].fields) {
    heatingLimit = heatingLoadRecord[0].fields.PHIUS_LIMIT;
  }

  // Pull out the "PHIUS_LIMIT" value from the "PEAK COOLING LOAD [TOTAL]" record
  let coolingLimit: any = 0;
  const coolingLoadRecord: CertResultRecord[] = coolingData.filter(
    (item: CertResultRecord) => item.fields.DISPLAY_NAME === "PEAK COOLING LOAD [TOTAL]"
  );
  if (coolingLoadRecord && coolingLoadRecord.length > 0 && coolingLoadRecord[0].fields) {
    coolingLimit = coolingLoadRecord[0].fields.PHIUS_LIMIT;
  }

  return {
    total: 0,
    heating: heatingLimit,
    cooling: coolingLimit,
  };
}

// ----------------------------------------------------------------------------
function CertResultDataGrid() {
  const [showModal, setShowModal] = useState(false);
  // RowData to Plot --
  // const [siteEnergyRowData, setSiteEnergyData] = useState<Array<DataGridRow>>(defaultRow);
  const [sourceEnergyRowData, setSourceEnergyData] = useState<Array<DataGridRow>>(defaultRow);
  const [heatingDemandRowData, setHeatingDemandData] = useState<Array<DataGridRow>>(defaultRow);
  const [coolingDemandRowData, setCoolingDemandData] = useState<Array<DataGridRow>>(defaultRow);
  const [heatingLoadRowData, setHeatingLoadData] = useState<Array<DataGridRow>>(defaultRow);
  const [coolingLoadRowData, setCoolingLoadData] = useState<Array<DataGridRow>>(defaultRow);
  // Limits ---
  const [sourceEnergyLimits, setSourceEnergyLimits] = useState<any>(defaultLimits);
  const [demandLimits, setDemandLimits] = useState<any>(defaultLimits);
  const [loadLimits, setLoadLimits] = useState<any>(defaultLimits);

  useEffect(() => {
    // Show modal if loading takes longer than 1s
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    // Fetch the data from AirTable and build up the new DataGrid rows
    fetchData(apiUrlCertResult).then((d: Record<any, any>) => {
      // ----------------------------------------------------------------------
      // Break out the data out into separate Objects by its 'type' attribute
      // ----------------------------------------------------------------------
      // const siteEnergyData: CertResultFields[] = d.filter(
      //   (item: CertResultFields) => item.fields.TYPE === "SITE_ENERGY"
      // );
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
      // const newSiteEnergyRows: DataGridRow[] = createRowDataArray(siteEnergyData);
      const newSourceEnergyRows: DataGridRow[] = createRowDataArray(sourceEnergyData);
      const newHeatingDemandRows: DataGridRow[] = createRowDataArray(heatingDemandData);
      const newCoolingDemandRows: DataGridRow[] = createRowDataArray(coolingDemandData);
      const newHeatingLoadRows: DataGridRow[] = createRowDataArray(heatingLoadData);
      const newCoolingLoadRows: DataGridRow[] = createRowDataArray(coolingLoadData);

      // ----------------------------------------------------------------------
      // Set the row state
      // ----------------------------------------------------------------------
      // newSiteEnergyRows.length > 0 ? setSiteEnergyData(newSiteEnergyRows) : setSiteEnergyData(defaultRow);
      newSourceEnergyRows.length > 0 ? setSourceEnergyData(newSourceEnergyRows) : setSourceEnergyData(defaultRow);
      newHeatingDemandRows.length > 0 ? setHeatingDemandData(newHeatingDemandRows) : setHeatingDemandData(defaultRow);
      newCoolingDemandRows.length > 0 ? setCoolingDemandData(newCoolingDemandRows) : setCoolingDemandData(defaultRow);
      newHeatingLoadRows.length > 0 ? setHeatingLoadData(newHeatingLoadRows) : setHeatingLoadData(defaultRow);
      newCoolingLoadRows.length > 0 ? setCoolingLoadData(newCoolingLoadRows) : setCoolingLoadData(defaultRow);

      // ----------------------------------------------------------------------
      // Set the 'Limits' for each of the graphs
      // ----------------------------------------------------------------------
      setSourceEnergyLimits(createAnnualEnergyLimits(sourceEnergyData));
      setDemandLimits(createDemandLimits(heatingDemandData, coolingDemandData));
      setLoadLimits(createLoadLimits(heatingLoadData, coolingLoadData));

      // Cleanup
      clearTimeout(timerId);
      setShowModal(false);
    });
  }, []);

  // --------------------------------------------------------------------------
  // Render the Graph Group Component

  return (
    <>
      {showModal ? (
        <Modal open={showModal}>
          <Box className="modal-box-loading">Loading Project Data...</Box>
        </Modal>
      ) : null}
      <ContentBlock>
        <Stack direction="row" spacing={3}>
          <CertificationResultGraphs
            title="Source Energy [kWh/a]"
            plotData={sourceEnergyRowData}
            limitData={sourceEnergyLimits}
            variant="energy"
          />
          <CertificationResultGraphs
            title="Energy Demand [kBtu/a]"
            plotData={[...heatingDemandRowData, ...coolingDemandRowData]}
            limitData={demandLimits}
            variant="demand"
          />
          <CertificationResultGraphs
            title="Peak Loads [Btu/h]"
            plotData={[...heatingLoadRowData, ...coolingLoadRowData]}
            limitData={loadLimits}
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
