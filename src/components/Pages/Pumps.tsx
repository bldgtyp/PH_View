import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";
import PumpsDataGrid from "../Tables/PumpDataGrid";

function Pumps() {
  return (
    <Page>
      {" "}
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Pumps...</h3>
        </Stack>
      </ContentBlock>
      <ContentBlock>
        <PumpsDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default Pumps;
