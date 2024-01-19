import Page from "./Page";
import ContentBlock from "./../components/layout/ContentBlock";
import { Stack } from "@mui/material";
import FrameTypesDataGrid from "./../components/tables/FrameTypesDataGrid";

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
              <li>Face width (in.)</li>
              <li>U-Value (Btu/hr-ft2-F)</li>
              <li>Psi-Glazing-Edge (Btu/hr-ft2-F)</li>
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
                <a href="https://www.phius.org/phius-frame-u-value-estimator">
                  Phius Frame U-Value Estimator (from NFRC)
                </a>
              </li>
              <li>
                <a href="https://database.passivehouse.com/en/components/">PHI Test Certificate</a>
              </li>
              <li>
                <a href="https://www.iso.org/standard/64995.html">ISO 10077-2:2017</a>
              </li>
            </ol>
          </li>
        </ul>
      </Stack>
    </>
  );
}

function FrameTypes() {
  return (
    <Page>
      <ContentBlock>
        <RequiredDocumentation />
      </ContentBlock>
      <ContentBlock>
        <FrameTypesDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default FrameTypes;
