import Page from "./Page";
import ContentBlock from "../components/layout/ContentBlock";
import { Stack } from "@mui/material";

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
