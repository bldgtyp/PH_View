import { Tooltip, Stack } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";

/**
 * Renders a hover over Tooltip with a Comments Icon.
 * @param params - The parameters for the cell.
 */
export const TooltipWithComment = (params: { row: { NOTES?: string } }) => {
  if (params.row.NOTES) {
    return (
      <Tooltip title={params.row.NOTES}>
        <Stack direction="row" spacing={1}>
          <CommentIcon className="notes-icon" fontSize="medium" />
        </Stack>
      </Tooltip>
    );
  } else {
    return <div>-</div>;
  }
};
