import { Box } from "@mui/material";
import "../styles/Page.css";

function Page(props: any) {
  return <Box className="page">{props.children}</Box>;
}

export default Page;
