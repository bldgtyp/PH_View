import { Stack } from "@mui/material";
import Page from "../pages/Page";
import ContentBlock from "../components/layout/ContentBlock";
import AppliancesDataGrid from "../components/tables/AppliancesDataGrid";

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
              <li>
                Dishwashers
                <ul>
                  <li>kWh / year</li>
                </ul>
              </li>
              <li>
                Refrigerators
                <ul>
                  <li>kWh / Day</li>
                </ul>
              </li>
              <li>
                Cook-tops / Ovens
                <ul>
                  <li>kWh / Use</li>
                </ul>
              </li>
              <li>
                Clothes Washers{" "}
                <ul>
                  <li>kWh / year</li>
                  <li>MEF (Modified Energy Factor)</li>
                </ul>
              </li>
              <li>
                Clothes Dryer
                <ul>
                  <li>CEF (Combined Energy Factor)</li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </Stack>
    </>
  );
}
function Appliances() {
  return (
    <Page>
      <ContentBlock>
        <RequiredDocumentation />
      </ContentBlock>
      <ContentBlock>
        <AppliancesDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default Appliances;
