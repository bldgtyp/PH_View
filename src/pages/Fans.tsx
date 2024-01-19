import Page from "./Page";
import ContentBlock from "./../components/layout/ContentBlock";
import { Stack } from "@mui/material";
import FanDataGrid from "./../components/tables/FanDataGrid";

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
              <li>Max flow-rate (cfm)</li>
              <li>Operating power (HP / Watts)</li>
            </ul>
          </li>
        </ul>
      </Stack>
    </>
  );
}

function Fans() {
  return (
    <Page>
      <ContentBlock>
        <RequiredDocumentation />
      </ContentBlock>
      <ContentBlock>
        <FanDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default Fans;
