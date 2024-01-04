import "../styles/SidebarItem.css";
import React from "react";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ListItemText, ListItemButton } from "@mui/material";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

// --------------------------------------------------------------------------------------
// Link and ListItemLink Components used to create the SidebarItem
const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(itemProps, ref) {
  return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});

type ListItemLinkProps = {
  text: string;
  icon: any;
  to: string;
};

function ListItemLink(props: ListItemLinkProps) {
  const { text, to, icon: Icon } = props;

  return (
    <div>
      <ListItemButton component={Link} to={to}>
        <ListItemIcon>
          <Icon className="sidebar-icon" />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </div>
  );
}

// --------------------------------------------------------------------------------------
// SidebarItem Component
type SidebarItemProps = {
  text: string;
  to: string;
  icon: any;
};

function SidebarItem({ text, to, icon }: SidebarItemProps) {
  return <ListItemLink text={text} to={to} icon={icon} />;
}

export default SidebarItem;
