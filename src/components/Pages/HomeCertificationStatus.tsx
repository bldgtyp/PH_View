import { Stack } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

function HomeCertificationStatus(props: { statusData: any; linkData: any; projData: any }) {
  const currentStep: number = props.statusData.CURRENT_STATUS ? parseInt(props.statusData.CURRENT_STATUS as string) : 0;

  // Pull out any 'statusData' items who have 'STEP' in the field name and return
  // an array in alphabetical order by the key ("STEP_1", "STEP_2", etc)
  const steps = Object.keys(props.statusData)
    .filter((item) => item.includes("STEP"))
    .sort()
    .map((key: string) => props.statusData[key]);

  return (
    <>
      <Stack className="content-block-heading">
        <h3>Project {props.projData.BLDGTYP_PROJECT_NUMBER}: Passive House Certification Status</h3>
      </Stack>
      <Stack spacing={4}>
        <Stepper
          activeStep={currentStep}
          alternativeLabel
          sx={{
            "& .MuiStepConnector-horizontal.Mui-active > span": {
              borderColor: "lightblue",
              borderWidth: "2px",
              borderStyle: "dashed",
              position: "relative",
              "::after": {
                content: "''",
                position: "absolute",
                transform: "translate(-50%, -150%)",
                width: 0,
                height: 0,
                borderStyle: "solid",
                borderWidth: "10px 10px 0 10px",
                borderColor: "lightblue transparent transparent transparent",
              },
            },
            "& .MuiStepConnector-horizontal.Mui-completed > span": {
              borderColor: "#1976d2",
              borderWidth: "2px",
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
            "& .MuiStepLabel-label": {
              fontSize: "0.8em",
            },
          }}
        >
          {steps.map((label: any) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Stack>
    </>
  );
}

export default HomeCertificationStatus;
