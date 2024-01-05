import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";
import GlazingTypesDataGrid from "../Tables/GlazingTypesDataGrid";

function GlazingTypes() {
  return (
    <Page>
      {" "}
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Glazing Types...</h3>
        </Stack>
      </ContentBlock>
      <ContentBlock>
        <GlazingTypesDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default GlazingTypes;
