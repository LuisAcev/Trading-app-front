import { useState } from "react";
import { styled } from "@mui/material/styles";
import Divider, { dividerClasses } from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MuiMenuItem from "@mui/material/MenuItem";
import { paperClasses } from "@mui/material/Paper";
import { listClasses } from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon, { listItemIconClasses } from "@mui/material/ListItemIcon";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import MenuButton from "./MenuButton";
import { useTranslation } from "react-i18next";

const MenuItem = styled(MuiMenuItem)({
  margin: "2px 0",
});
const StyleMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: 'hsl(220, 30%, 7%)',
  },
}));

export default function OptionsMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { t } = useTranslation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <MenuButton
        aria-label="Open menu"
        onClick={handleClick}
        sx={{ borderColor: "transparent" }}
      >
        <MoreVertRoundedIcon />
      </MenuButton>
      <StyleMenu
        anchorEl={anchorEl}
        id="menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          [`& .${listClasses.root}`]: {
            padding: "4px",
          },
          [`& .${paperClasses.root}`]: {
            padding: 0,
          },
          [`& .${dividerClasses.root}`]: {
            margin: "4px -4px",
          },
        }}
      >
        <MenuItem onClick={handleClose}>{t("login.account")}</MenuItem>
        <MenuItem onClick={handleClose}>{t("login.settings")}</MenuItem>
        <Divider />
        <MenuItem
          onClick={handleClose}
          sx={{
            [`& .${listItemIconClasses.root}`]: {
              ml: "auto",
              minWidth: 0,
            },
          }}
        >
          <ListItemText>{t("login.log_out")}</ListItemText>
          <ListItemIcon>
            <LogoutRoundedIcon fontSize="small" />
          </ListItemIcon>
        </MenuItem>
      </StyleMenu>
    </>
  );
}
