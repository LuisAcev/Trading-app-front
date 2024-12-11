import { useState } from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../../ColorModeIconDropdown";
import { useNavigate } from "react-router-dom";
import { LanguageFlag } from "../../../components/LanguageFlags";
import { dataLenguage } from "../../../../db/lenguageDb";
import { useTranslation } from "react-i18next";
import SocialMedias from "./SocialMedias";
import { useSelector } from "react-redux";

export default function AppAppBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { isLoading } = useSelector((item) => item.userSlice);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleSignIn = () => {
    navigate(`/sign_in`, {});
  };

  const handleIsLogged = () => {
    navigate(`/dashboard/charts/c`, {});
  };

  const handleSignUp = () => {
    navigate(`/sign_up`, {});
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <SocialMedias />
          <LanguageFlag data={dataLenguage} />

          {/* Buttons sign in y sign up */}

          <ColorModeIconDropdown />
          
          {isLoading ? (
            <Button
              color="primary"
              variant="text"
              onClick={handleIsLogged}
              size="small"
              sx={{ backgroundColor: "#102848" }}
            >
              {t("signIn.signInLogged")}
            </Button>
          ) : (
            <Button
              color="primary"
              variant="text"
              onClick={handleSignIn}
              size="small"
              sx={{ backgroundColor: "#102848" }}
            >
              {t("signIn.signIn")}
            </Button>
          )}
          <Button
            color="primary"
            variant="text"
            onClick={handleSignUp}
            size="small"
            sx={{ backgroundColor: "#102848" }}
          >
            {t("signUp.signUp")}
          </Button>
        </Box>
        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            justifyContent: "flex-end",
            gap: 1,
          }}
        >
          <SocialMedias />
          <LanguageFlag data={dataLenguage} />
          <ColorModeIconDropdown size="medium" />
          <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor="top"
            open={open}
            onClose={toggleDrawer(false)}
            PaperProps={{
              sx: {
                top: "var(--template-frame-height, 0px)",
              },
            }}
          >
            <Box sx={{ p: 2, backgroundColor: "background.default" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <IconButton onClick={toggleDrawer(false)}>
                  <CloseRoundedIcon />
                </IconButton>
              </Box>

              <MenuItem>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={handleSignUp}
                >
                  {t("signUp.signUp")}
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  onClick={handleSignIn}
                >
                  {t("signIn.signIn")}
                </Button>
              </MenuItem>
            </Box>
          </Drawer>
        </Box>
      </Container>
    </AppBar>
  );
}
