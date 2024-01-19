import { Stack } from "@mui/material";
import ContentBlock from "../components/layout/ContentBlock";
import WindowUnitDataGrid from "../components/tables/WindowUnitDataGrid";
import Page from "./Page";

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
              <h4>Window/Door Schedule:</h4>
              <p>
                A clear schedule of unit-types with sizes included in the drawing-set which is used as the
                basis-of-design.
              </p>
            </Stack>
          </li>
          <li>
            <Stack spacing={1} direction="row">
              <h4>Supplier Submittal:</h4>
              <p>The final 'as-built' submittal from the window / door supplier.</p>
            </Stack>
          </li>
        </ul>
      </Stack>
    </>
  );
}

function WindowUnitTypes() {
  return (
    <Page>
      <ContentBlock>
        <RequiredDocumentation />
      </ContentBlock>
      <ContentBlock>
        <WindowUnitDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default WindowUnitTypes;
