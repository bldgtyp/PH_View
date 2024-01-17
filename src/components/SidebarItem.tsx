import "../styles/SidebarItem.css";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ListItemText, ListItemButton } from "@mui/material";

type ListItemLinkProps = {
  text: string;
  onClick: any;
  icon: any;
};

function ListItemLink(props: ListItemLinkProps) {
  const { text, onClick, icon: Icon } = props;

  return (
    <>
      <ListItemButton
        sx={{
          marginTop: 0,
          paddingTop: "6px",
          paddingBottom: "6px",
        }}
        onClick={onClick}
      >
        <ListItemIcon>
          <Icon className="sidebar-icon" />
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItemButton>
    </>
  );
}

// --------------------------------------------------------------------------------------
// SidebarItem Component
type SidebarItemProps = {
  text: string;
  onClick: any;
  icon: any;
};

function SidebarItem({ text, onClick, icon }: SidebarItemProps) {
  return <ListItemLink text={text} onClick={onClick} icon={icon} />;
}

export default SidebarItem;
