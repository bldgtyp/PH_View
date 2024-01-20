import { Stack } from "@mui/material";
import Page from "./Page";
import ContentBlock from "../components/layout/ContentBlock";
import HotWaterTanksDataGrid from "../components/tables/HotWaterTanksDataGrid";

function RequiredDocumentation() {
  return (
    <>
      <Stack className="content-block-heading" spacing={1}>
        <h3>Required Documentation:</h3>
      </Stack>
      <Stack sx={{ textAlign: "left" }}>
        <ul>
          <li>
            <Stack spacing={1} direction="row">
              <h4>Product Specification:</h4>
              <p>A product specification included in the drawing-set which is used as the basis-of-design.</p>
            </Stack>
          </li>
          <li>
            <Stack spacing={1} direction="row">
              <h4>Product Data Sheet:</h4>
              <p>A PDF datasheet for the specified product which includes all of the required performance values:</p>
            </Stack>
            <ul>
              <li>kWh / year</li>
            </ul>
          </li>
        </ul>
      </Stack>
    </>
  );
}
function HotWaterTanks() {
  return (
    <Page>
      <ContentBlock>
        <RequiredDocumentation />
      </ContentBlock>
      <ContentBlock>
        <HotWaterTanksDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default HotWaterTanks;
