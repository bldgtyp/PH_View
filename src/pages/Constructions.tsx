import { Stack } from "@mui/material";
import Page from "./Page";
import ContentBlock from "../components/layout/ContentBlock";

function Constructions() {
  return (
    <Page>
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Constructions...</h3>
        </Stack>
      </ContentBlock>
    </Page>
  );
}

export default Constructions;
