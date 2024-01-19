import "../../styles/ContentBlock.css";
import { Paper } from "@mui/material";

function ContentBlock(props: any) {
  return (
    <Paper elevation={2} className="content-block">
      {props.children}
    </Paper>
  );
}

export default ContentBlock;
