import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalculateIcon from "@mui/icons-material/Calculate";
import PsychologyIcon from "@mui/icons-material/Psychology";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuContent() {
  const { t } = useTranslation();

  // Estado para manejar el ítem seleccionado
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const mainListItems = [
    {
      text: t("menucontent.charts"),
      icon: <QueryStatsIcon />,
      redir: "charts",
    },
    {
      text: t("menucontent.economic-calendar"),
      icon: <CalendarMonthIcon />,
      redir: "economic_calendar",
    },
    {
      text: t("menucontent.calculator"),
      icon: <CalculateIcon />,
      redir: "calculator",
    },
    {
      text: t("menucontent.trading_ideas"),
      icon: <PsychologyIcon />,
      redir: "trading_ideas",
    },
  ];

  const secondaryListItems = [
    { text: t("menucontent.settings"), icon: <SettingsIcon /> },
    { text: t("menucontent.account"), icon: <AccountBoxIcon />, redir: "account"},
    { text: t("menucontent.home"), icon: <HomeRoundedIcon />, redir: "home" },
  ];

  const thirdListItems = [
    {
      text: "GitHub",
      icon: <FacebookIcon />,
      redir: "https://github.com/LuisAcev?tab=repositories",
    },
    {
      text: "LinkedIn",
      icon: <LinkedInIcon />,
      redir: "https://www.linkedin.com/in/luisfelipevigoya/",
    },
  ];

  const handelRedirect = (redir) => {
    if (redir === "charts") {
      navigate(`/dashboard/${redir}/c`, {
        replace: true,
      });
      return;
    }
    if (redir !== "home") {
      navigate(`/dashboard/${redir}`, {
        replace: true,
      });
    } else {
      navigate(`/`, {
        replace: true,
      });
    }
  };
  const handleListItemClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1 }}>
      <List dense>
        {mainListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={() => {
                handleListItemClick(index);
                handelRedirect(item.redir);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider flexItem orientation="horizontal" sx={{ mx: 0.5, my: 1 }} />
      <List dense>
        {secondaryListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === mainListItems.length + index}
              onClick={() => {
                handleListItemClick(mainListItems.length + index);
                handelRedirect(item.redir);
              }}
            >
              <ListItemIcon >{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider flexItem orientation="horizontal" sx={{ mx: 0.5, my: 1 }} />
      <List dense>
        {thirdListItems.map((item, index) => (
          <ListItem key={index} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              selected={selectedIndex === mainListItems.length + index + 2}
              onClick={() => {
                handleListItemClick(mainListItems.length + index);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <Link href={item.redir} color='warning'>
                <ListItemText primary={item.text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
