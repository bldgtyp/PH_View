import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";
import FanDataGrid from "../FanDataGrid";

function Fans() {
  return (
    <Page>
      {" "}
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Fans...</h3>
        </Stack>
      </ContentBlock>
      <ContentBlock>
        <FanDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default Fans;
