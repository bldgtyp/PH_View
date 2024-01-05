import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";
import MaterialsDataGrid from "../Tables/MaterialsDataGrid";

function Materials() {
  return (
    <Page>
      {" "}
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Materials...</h3>
        </Stack>
      </ContentBlock>
      <ContentBlock>
        <MaterialsDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default Materials;
