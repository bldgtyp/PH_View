import Page from "./Page";
import ContentBlock from "./../components/layout/ContentBlock";
import { Stack } from "@mui/material";
import MaterialsDataGrid from "./../components/tables/MaterialsDataGrid";

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
              <h4>Data Sheet:</h4>
              <p>A PDF datasheet for the specified product which includes all of the required performance values:</p>
            </Stack>
            <ul>
              <li>Thermal Conductivity (Btu/hr-ft-F) or</li>
              <li>Thermal Resistivity (hr-ft2-F/Btu-in)</li>
            </ul>
          </li>
        </ul>
      </Stack>
    </>
  );
}

function Materials() {
  return (
    <Page>
      <ContentBlock>
        <RequiredDocumentation />
      </ContentBlock>
      <ContentBlock>
        <MaterialsDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default Materials;
