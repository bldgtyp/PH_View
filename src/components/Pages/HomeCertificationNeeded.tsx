import { Stack } from "@mui/material";

function HomeCertificationNeeded(props: { statusData: any; linkData: any; projData: any }) {
  return (
    <>
      <Stack className="content-block-heading">
        <h3>Phius Certification Information Still Needed:</h3>
      </Stack>
      <Stack sx={{ textAlign: "left" }}>
        <p>
          In order to complete the Phius Certification model, all required product specifications and data-sheets must
          be collected and included along with the WUFI-Passive model. Please review the summary list below, as well as
          the detailed breakdown of items in each section.
        </p>
      </Stack>
      <Stack sx={{ textAlign: "left" }}>
        <ul>
          <li>All glazing submittals from window/door supplier</li>
          <li>All frame types from window/door supplier</li>
          <li>Updated Ventilators (re-specify all 'Retired' units)</li>
          <li>Missing fans for laundry rooms</li>
          <li>Missing lighting fixture cut-sheets</li>
          <li>Updated dryer product specification.</li>
          <li>All envelope-material (insulation, etc) product specifications and cut-sheets</li>
        </ul>
      </Stack>
    </>
  );
}

export default HomeCertificationNeeded;
