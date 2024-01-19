import "../styles/Page.css";
import { Box } from "@mui/material";

function Page(props: any) {
  return <Box className="page">{props.children}</Box>;
}

export default Page;
