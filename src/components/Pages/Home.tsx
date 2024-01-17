import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import fetchData from "../fetchAirTable";
import Page from "./Page";
import ContentBlock from "../ContentBlock";
import HomeCertificationStatus from "./HomeCertificationStatus";
import HomeCertificationLinks from "./HomeCertificationLinks";
import HomeCertificationNeeded from "./HomeCertificationNeeded";

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
  const [certStatusData, setCertStatusData] = useState({});
  const [certLinkData, setCertLinkData] = useState({});
  const [certProjectData, setCertProjectData] = useState({});

  useEffect(() => {
    const fetchProjectData = async () => {
      const d = await fetchData(`${projectId}/config`);
      // handle the fetched data
      setCertStatusData(flattenData(d.filter((item: any) => item.fields.SECTION === "CERT_STATUS")));
      setCertLinkData(flattenData(d.filter((item: any) => item.fields.SECTION === "LINKS")));
      setCertProjectData(flattenData(d.filter((item: any) => item.fields.SECTION === "PROJ_DATA")));
    };

    fetchProjectData();
  }, [projectId]);

  return (
    <Page>
      <ContentBlock>
        <HomeCertificationStatus statusData={certStatusData} linkData={certLinkData} projData={certProjectData} />
      </ContentBlock>
      <ContentBlock>
        <HomeCertificationLinks statusData={certStatusData} linkData={certLinkData} projData={certProjectData} />
      </ContentBlock>
      <ContentBlock>
        <HomeCertificationNeeded statusData={certStatusData} linkData={certLinkData} projData={certProjectData} />
      </ContentBlock>
    </Page>
  );
}

export default Home;
