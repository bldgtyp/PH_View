import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";
import FrameTypesDataGrid from "../Tables/FrameTypesDataGrid";

function FrameTypes() {
  return (
    <Page>
      {" "}
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Frame Types...</h3>
        </Stack>
      </ContentBlock>
      <ContentBlock>
        <FrameTypesDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default FrameTypes;
