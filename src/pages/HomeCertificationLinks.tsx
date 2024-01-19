import { Stack, Button } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import StorageIcon from "@mui/icons-material/Storage";

function ButtonPhiusCalendar(props: { phiusNumber?: string }) {
  // Display the Phius Calendar button if the project number is defined
  if (props.phiusNumber !== undefined) {
    return (
      <Button
        variant="contained"
        startIcon={<CalendarMonthIcon />}
        component="a"
        href="https://analytics.zoho.com/open-view/2359498000004277863"
      >
        Go to Phius Review Calendar (Phius Project # {props.phiusNumber})
      </Button>
    );
  } else {
    return <></>;
  }
}

function ButtonPhiusDropbox(props: { phiusDropboxUrl?: string }) {
  // Display the Phius Dropbox button if the URL is defined
  if (props.phiusDropboxUrl !== undefined) {
    return (
      <Button variant="contained" startIcon={<FolderSharedIcon />} component="a" href={props.phiusDropboxUrl}>
        Go to Phius Project Dropbox Folder
      </Button>
    );
  } else {
    return <></>;
  }
}

function ButtonAirtable(props: { airTablePublicUrl?: string }) {
  // Display the Airtable button if the URL is defined
  if (props.airTablePublicUrl !== undefined) {
    return (
      <Button variant="contained" startIcon={<StorageIcon />} component="a" href={props.airTablePublicUrl}>
        Go to Project Database
      </Button>
    );
  } else {
    return <></>;
  }
}

function HomeCertificationLinks(props: {
  statusData: Record<string, any>;
  linkData: { PHIUS_DROPBOX_URL?: string; AIRTABLE_PUBLIC_URL?: string };
  projData: { PHIUS_PROJECT_NUMBER?: string };
}) {
  return (
    <Stack direction="row" spacing={2}>
      <ButtonPhiusCalendar phiusNumber={props.projData.PHIUS_PROJECT_NUMBER} />
      <ButtonPhiusDropbox phiusDropboxUrl={props.linkData.PHIUS_DROPBOX_URL} />
      <ButtonAirtable airTablePublicUrl={props.linkData.AIRTABLE_PUBLIC_URL} />
    </Stack>
  );
}

export default HomeCertificationLinks;
