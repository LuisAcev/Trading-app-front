import * as React from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import MuiDrawer, { drawerClasses } from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MenuContent from "./MenuContent";
import OptionsMenu from "./OptionMenu";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer)({
  width: drawerWidth,
  flexShrink: 0,
  boxSizing: "border-box",
  mt: 10,
  [`& .${drawerClasses.paper}`]: {
    width: drawerWidth,
    boxSizing: "border-box",
  },
});

export default function SideMenu() {
  const { t } = useTranslation();
  const { fullname, email, img } = useSelector((user) => user.userSlice);
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", md: "block" },
        [`& .${drawerClasses.paper}`]: {
          backgroundColor: "background.paper",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: "calc(var(--template-frame-height, 0px) + 4px)",
          p: 1.5,
        }}
      >
        <Typography
          component="span"
          variant="h1"
          sx={(theme) => ({
            fontSize: "inherit",
            fontFamily: "Noto Sans JP, sans-serif",
            fontOpticalSizing: "auto",
            fontWeight: "BOLD",
            fontStyle: "italic",
            fontSize: 23,
            color: "primary.main",
            ...theme.applyStyles("dark", {
              color: "primary.light",
            }),
          })}
        >
          {t("header")}
        </Typography>
      </Box>
      <Divider />
      <MenuContent />

      <Stack
        direction="row"
        sx={{
          p: 2,
          gap: 1,
          alignItems: "center",
          borderTop: "1px solid",
          borderColor: "divider",
        }}
      >
        <Avatar
          sizes="small"
          alt="owner"
          src={img}
          sx={{ width: 40, height: 42 }}
        />
        <Box sx={{ mr: "auto" }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 500, lineHeight: "16px" }}
          >
            {fullname}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.secondary" }}>
            {email}
          </Typography>
        </Box>
        <OptionsMenu />
      </Stack>
    </Drawer>
  );
}
