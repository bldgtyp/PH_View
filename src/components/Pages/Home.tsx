import Page from "./Page";
import ContentBlock from "../ContentBlock";
import { Stack, Button } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import StorageIcon from "@mui/icons-material/Storage";

function Home() {
  const steps = [
    "Registered with Phius",
    "Round 1 Review [Target: 2/13/2024]",
    "Round 2 Review",
    "Round 3 Review",
    "Round 4 Review",
    "Design Phase Certification",
    "Final Certification",
  ];

  return (
    <Page>
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Project 2441: Phius Certification Status</h3>
        </Stack>
        <Stack spacing={4}>
          <Stepper
            activeStep={1}
            alternativeLabel
            sx={{
              "& .MuiStepConnector-horizontal.Mui-active > span": {
                borderColor: "lightblue",
              },
              "& .MuiStepLabel-iconContainer.Mui-active": {
                color: "lightblue",
                position: "relative",
                "&::after": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: "32px",
                  height: "32px",
                  border: "2px solid lightblue",
                  borderRadius: "50%",
                  backgroundColor: "transparent",
                  transform: "translate(-50%, -50%)",
                },
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              startIcon={<CalendarMonthIcon />}
              component="a"
              href="https://analytics.zoho.com/open-view/2359498000004277863"
            >
              View Phius Review Calendar (Project # 2441)
            </Button>
            <Button
              variant="contained"
              startIcon={<FolderSharedIcon />}
              component="a"
              href="https://www.dropbox.com/scl/fo/5b2w4n9wc1psda63xso4m/h?rlkey=e5c4bvo1visbecr0uea9lt0r3&dl=0"
            >
              View Phius Project Dropbox Folder
            </Button>
            <Button
              variant="contained"
              startIcon={<StorageIcon />}
              component="a"
              href="https://airtable.com/app2huKgwyKrnMRbp/shrSv8dzQdTVHyIBr"
            >
              View Project Database
            </Button>
          </Stack>
        </Stack>
      </ContentBlock>
      <ContentBlock>
        <Stack className="content-block-heading">
          <h3>Phius Certification Information Still Needed:</h3>
        </Stack>
        <Stack sx={{ textAlign: "left" }}>
          <p>
            In order to complete the Phius Certification model, all required product specifications and data-sheets must
            be collected and included along with the WUFI-Passive model. Please review the summary list below, as well
            as the detailed breakdown of items in each section.
          </p>
        </Stack>
        <Stack sx={{ textAlign: "left" }}>
          <ul>
            <li>Window and Door Submittals from supplier</li>
            <li>Updated Ventilators (re-specify all 'Retired' units)</li>
            <li>Missing fans for laundry rooms</li>
            <li>Missing lighting fixture cut-sheets</li>
            <li>Updated dryer product.</li>
            <li>All Material product specifications and cut-sheets</li>
          </ul>
        </Stack>
      </ContentBlock>
    </Page>
  );
}

export default Home;
