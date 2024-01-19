import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Modal } from "@mui/material";

import ContentBlock from "../components/layout/ContentBlock";
import SummaryGrid from "../components/tables/HomeSummaryDataGrid";
import fetchData from "../hooks/fetchAirTable";
import Page from "./Page";
import HomeCertificationStatus from "./HomeCertificationStatus";
import HomeCertificationLinks from "./HomeCertificationLinks";

type AirTableRecord = { id: string; fields: { FIELD_NAME?: string; SECTION?: string; VALUE?: string } };

function flattenData(d: AirTableRecord[]) {
  let flatData: Record<string, string | undefined> = {};
  d.forEach((item) => {
    if (item.fields !== undefined && item.fields.FIELD_NAME !== undefined) {
      flatData[item.fields.FIELD_NAME] = item.fields.VALUE;
    }
  });
  return flatData;
}

function Home() {
  let { projectId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [certStatusData, setCertStatusData] = useState({});
  const [certLinkData, setCertLinkData] = useState({});
  const [certProjectData, setCertProjectData] = useState({});

  useEffect(() => {
    // Show modal if loading takes longer than 1s
    let timerId: NodeJS.Timeout;
    timerId = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    const fetchProjectData = async () => {
      const d = await fetchData(`${projectId}/config`);
      // handle the fetched data
      setCertStatusData(flattenData(d.filter((item: any) => item.fields.SECTION === "CERT_STATUS")));
      setCertLinkData(flattenData(d.filter((item: any) => item.fields.SECTION === "LINKS")));
      setCertProjectData(flattenData(d.filter((item: any) => item.fields.SECTION === "PROJ_DATA")));

      // Cleanup
      clearTimeout(timerId);
      setShowModal(false);
    };

    fetchProjectData();
  }, [projectId]);

  return (
    <>
      {showModal ? (
        <Modal open={showModal}>
          <Box className="modal-box-loading">Loading Project Data...</Box>
        </Modal>
      ) : null}
      <Page>
        <ContentBlock>
          <HomeCertificationStatus statusData={certStatusData} linkData={certLinkData} projData={certProjectData} />
        </ContentBlock>
        <ContentBlock>
          <HomeCertificationLinks statusData={certStatusData} linkData={certLinkData} projData={certProjectData} />
        </ContentBlock>
        <ContentBlock>
          <SummaryGrid />
        </ContentBlock>
      </Page>
    </>
  );
}

export default Home;
