import { Tooltip, Stack } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

/**
 * Renders an info tooltip in with an 'Info' icon.
 * @param params - The parameters for the cell.
 * @returns The rendered info tooltip cell.
 */
export const TooltipWithInfo = (params: any) =>
  params.row.FLAG ? (
    <Tooltip title={params.row.FLAG}>
      <Stack direction="row" spacing={1}>
        <InfoIcon className="critical-info-icon" fontSize="medium" />
        <div>{params.value}</div>
      </Stack>
    </Tooltip>
  ) : (
    params.value
  );
