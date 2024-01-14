import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack } from "@mui/material";
import CertificationResultsDataGrid from "../Tables/CertResultsContainer";

function CertificationResults() {
  return (
    <Page>
      {" "}
      <CertificationResultsDataGrid />
    </Page>
  );
}

export default CertificationResults;
