import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";
import WindowUnitDataGrid from "../Tables/WindowUnitDataGrid";

function WindowUnitTypes() {
  return (
    <Page>
      {" "}
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Window Unit Types...</h3>
        </Stack>
      </ContentBlock>
      <ContentBlock>
        <WindowUnitDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default WindowUnitTypes;
