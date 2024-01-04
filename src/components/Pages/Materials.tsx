import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";

function Materials() {
  return (
    <Page>
      {" "}
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Materials...</h3>
        </Stack>
      </ContentBlock>
    </Page>
  );
}

export default Materials;
