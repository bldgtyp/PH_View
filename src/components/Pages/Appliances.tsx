import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";
import AppliancesDataGrid from "../Tables/AppliancesDataGrid";

function Appliances() {
  return (
    <Page>
      {" "}
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Appliances...</h3>
        </Stack>
      </ContentBlock>
      <ContentBlock>
        <AppliancesDataGrid />
      </ContentBlock>
    </Page>
  );
}

export default Appliances;
