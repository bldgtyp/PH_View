import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";
import LightingDataGrid from "../Tables/LightingDataGrid";

function Lighting() {
  return (
    <Page>
      {" "}
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Lighting...</h3>
        </Stack>
      </ContentBlock>
      <ContentBlock>
        <LightingDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default Lighting;
