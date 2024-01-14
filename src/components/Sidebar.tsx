import { Stack, Typography, Paper } from "@mui/material";
import SidebarItem from "./SidebarItem";
import { ReactComponent as HomeIcon } from "../icons/sidebar/home.svg";
import { ReactComponent as CertResultsIcon } from "../icons/sidebar/cert_results.svg";
import { ReactComponent as GlazingTypeIcon } from "../icons/sidebar/glazing-type.svg";
import { ReactComponent as FrameTypeIcon } from "../icons/sidebar/frame-type.svg";
import { ReactComponent as UnitTypeIcon } from "../icons/sidebar/unit-type.svg";
import { ReactComponent as FanIcon } from "../icons/sidebar/fans.svg";
import { ReactComponent as PumpIcon } from "../icons/sidebar/pumps.svg";
import { ReactComponent as VentilatorIcon } from "../icons/sidebar/ventilators.svg";
import { ReactComponent as LightIcon } from "../icons/sidebar/lighting.svg";
import { ReactComponent as ApplianceIcon } from "../icons/sidebar/appliances.svg";
import { ReactComponent as MaterialIcon } from "../icons/sidebar/material.svg";
import { ReactComponent as ConstructionIcon } from "../icons/sidebar/constructions.svg";

function Sidebar() {
  return (
    <Stack className="sidebar-container" spacing={2}>
      <Paper elevation={1} className="sidebar-group">
        <Stack>
          {/* <Typography variant="h5" className="sidebar-heading">
            Certification
          </Typography> */}
          <SidebarItem text="Home" to="home" icon={HomeIcon} />
          <SidebarItem text="Results" to="cert-results" icon={CertResultsIcon} />
        </Stack>
      </Paper>
      <Paper elevation={1} className="sidebar-group">
        <Stack>
          <Typography variant="h5" className="sidebar-heading">
            Apertures
          </Typography>
          <SidebarItem text="Glazing Types" to="glazing-types" icon={GlazingTypeIcon} />
          <SidebarItem text="Frame Types" to="frame-types" icon={FrameTypeIcon} />
          <SidebarItem text="Unit Types" to="window-unit-types" icon={UnitTypeIcon} />
        </Stack>
      </Paper>
      <Paper elevation={1} className="sidebar-group">
        <Stack>
          <Typography variant="h5" className="sidebar-heading">
            Equipment
          </Typography>
          <SidebarItem text="Ventilators" to="ventilation" icon={VentilatorIcon} />
          <SidebarItem text="Pumps" to="pumps" icon={PumpIcon} />
          <SidebarItem text="Fans" to="fans" icon={FanIcon} />
          <SidebarItem text="Lighting" to="lighting" icon={LightIcon} />
          <SidebarItem text="Appliances" to="appliances" icon={ApplianceIcon} />
        </Stack>
      </Paper>
      <Paper elevation={1} className="sidebar-group">
        <Stack>
          <Typography variant="h5" className="sidebar-heading">
            Assemblies
          </Typography>
          <SidebarItem text="Materials" to="materials" icon={MaterialIcon} />
          <SidebarItem text="Constructions" to="constructions" icon={ConstructionIcon} />
        </Stack>
      </Paper>
    </Stack>
  );
}

export default Sidebar;
