import Page from "./Page";
import ErvDataGrid from "../Tables/ErvDataGrid";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";

function RequiredDocumentation() {
  return (
    <>
      {" "}
      <Stack className="content-block-heading" spacing={1}>
        <h3>Required Documentation:</h3>
      </Stack>
      <Stack sx={{ textAlign: "left" }}>
        <ul>
          <li>
            <Stack spacing={1} direction="row">
              <h4>Product DataSheet:</h4>
              <p>A PDF for the specified product which includes the required performance values.</p>
            </Stack>
          </li>
          <li>
            <Stack spacing={1} direction="row">
              <h4>Design-Phase Specification:</h4>
              <p>A product specification included in the drawing-set which is used as the basis-of-design.</p>
            </Stack>
          </li>
          <li>
            <Stack spacing={1} direction="row">
              <h4>Final Specification:</h4>
              <p>a product specification for the final as-built (purchased) unit.</p>
            </Stack>
          </li>
        </ul>
      </Stack>
    </>
  );
}

function Ventilation() {
  return (
    <Page>
      <ContentBlock>
        <RequiredDocumentation />
      </ContentBlock>
      <ContentBlock>
        <ErvDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default Ventilation;
