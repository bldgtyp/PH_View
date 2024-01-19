import Page from "./Page";
import ContentBlock from "../components/layout/ContentBlock";
import { Stack } from "@mui/material";
import GlazingTypesDataGrid from "../components/tables/GlazingTypesDataGrid";

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
              <li>Center-of-Glass U-Value (Btu/hr-ft2-F)</li>
              <li>g-Value / SHGC (%)</li>
            </ul>
          </li>
          <li>
            <Stack spacing={1} direction="row">
              <h4>Acceptable Testing Protocols:</h4>
            </Stack>
            <ol>
              <li>
                <a href="https://www.phius.org/window-database">Phius Verified Window Performance</a>
              </li>
              <li>
                <a href="https://calumen.com/">Supplier Test Report (Calumen)</a>
              </li>
              <li>
                <a href="https://standards.iteh.ai/catalog/standards/cen/6b5e33d2-5527-414b-beab-1779618a365a/en-673-2011">
                  EN-673 (U-Value)
                </a>
              </li>
              <li>
                <a href="https://standards.iteh.ai/catalog/standards/cen/511a6697-5bf9-4bf1-ba5d-dfe9cfd01aa8/en-410-2011">
                  EN-410 (g-Value)
                </a>
              </li>
            </ol>
          </li>
        </ul>
      </Stack>
    </>
  );
}

function GlazingTypes() {
  return (
    <Page>
      <ContentBlock>
        <RequiredDocumentation />
      </ContentBlock>
      <ContentBlock>
        <GlazingTypesDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default GlazingTypes;
