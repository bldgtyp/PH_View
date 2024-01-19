import { Stack, Typography, Paper } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import { ReactComponent as HomeIcon } from "../../assets/icons/sidebar/home.svg";
import { ReactComponent as CertResultsIcon } from "../../assets/icons/sidebar/cert_results.svg";
import { ReactComponent as GlazingTypeIcon } from "../../assets/icons/sidebar/glazing-type.svg";
import { ReactComponent as FrameTypeIcon } from "../../assets/icons/sidebar/frame-type.svg";
import { ReactComponent as UnitTypeIcon } from "../../assets/icons/sidebar/unit-type.svg";
import { ReactComponent as FanIcon } from "../../assets/icons/sidebar/fans.svg";
import { ReactComponent as PumpIcon } from "../../assets/icons/sidebar/pumps.svg";
import { ReactComponent as VentilatorIcon } from "../../assets/icons/sidebar/ventilators.svg";
import { ReactComponent as LightIcon } from "../../assets/icons/sidebar/lighting.svg";
import { ReactComponent as ApplianceIcon } from "../../assets/icons/sidebar/appliances.svg";
import { ReactComponent as MaterialIcon } from "../../assets/icons/sidebar/material.svg";
import { ReactComponent as ConstructionIcon } from "../../assets/icons/sidebar/constructions.svg";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  // Assuming the projectId is always the second parameter after root.
  // https://{root}/PH_View{projectID}/page
  const projectId = location.pathname.split("/")[1];
  const goToPage = (page: string) => {
    navigate(`${projectId}/${page}`);
  };

  return (
    <Stack className="sidebar-container" spacing={2}>
      <Paper elevation={1} className="sidebar-group">
        <SidebarItem text="Home" onClick={() => goToPage("home")} icon={HomeIcon} />
        <SidebarItem text="Results" onClick={() => goToPage("cert-results")} icon={CertResultsIcon} />
      </Paper>
      <Paper elevation={1} className="sidebar-group">
        <Stack>
          <Typography variant="h5" className="sidebar-heading">
            Apertures
          </Typography>
          <SidebarItem text="Glazing Types" onClick={() => goToPage("glazing-types")} icon={GlazingTypeIcon} />
          <SidebarItem text="Frame Types" onClick={() => goToPage("frame-types")} icon={FrameTypeIcon} />
          <SidebarItem text="Unit Types" onClick={() => goToPage("window-unit-types")} icon={UnitTypeIcon} />
        </Stack>
      </Paper>
      <Paper elevation={1} className="sidebar-group">
        <Stack>
          <Typography variant="h5" className="sidebar-heading">
            Equipment
          </Typography>
          <SidebarItem text="Ventilators" onClick={() => goToPage("ventilation")} icon={VentilatorIcon} />
          <SidebarItem text="Pumps" onClick={() => goToPage("pumps")} icon={PumpIcon} />
          <SidebarItem text="Fans" onClick={() => goToPage("fans")} icon={FanIcon} />
          <SidebarItem text="Lighting" onClick={() => goToPage("lighting")} icon={LightIcon} />
          <SidebarItem text="Appliances" onClick={() => goToPage("appliances")} icon={ApplianceIcon} />
        </Stack>
      </Paper>
      <Paper elevation={1} className="sidebar-group">
        <Stack>
          <Typography variant="h5" className="sidebar-heading">
            Assemblies
          </Typography>
          <SidebarItem text="Materials" onClick={() => goToPage("materials")} icon={MaterialIcon} />
          <SidebarItem text="Constructions" onClick={() => goToPage("constructions")} icon={ConstructionIcon} />
        </Stack>
      </Paper>
    </Stack>
  );
}

export default Sidebar;
