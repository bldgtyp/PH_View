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
              <li>Heat-Recovery Efficiency (%)</li>
              <li>Moisture-Recovery Efficiency (%)</li>
              <li>Average Fan-Power (W/cfm)</li>
              <li>Outside Air Filter Type</li>
              <li>Extract Air Filter Type</li>
            </ul>
          </li>
          <li>
            <Stack spacing={1} direction="row">
              <h4>Acceptable Testing Protocols:</h4>
            </Stack>
            <ol>
              <li>
                <a href="https://www.ahrinet.org/search-standards/ahri-1060-i-p-and-1061-si-performance-rating-air-air-exchangers-energy-recovery-ventilation">
                  AHRI 1060 Certificate
                </a>
              </li>
              <li>
                <a href="https://www.hvi.org/resources/publications/home-ventilation-guide-articles/hvi-certified-ventilation-performance/">
                  HVI Test Certificate
                </a>
              </li>
              <li>
                <a href="https://passivehouse.com/01_passivehouseinstitute/02_expertise/01_researchinbuildingphysics/03_Ventilationsystems/03_Ventilationsystems.html">
                  PHI Test Certificate
                </a>
              </li>
            </ol>
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
