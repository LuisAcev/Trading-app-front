import Stack from "@mui/material/Stack";
import ColorModeIconDropdown from "../ColorModeIconDropdown";
import Search from "./Search";
import { LanguageFlag } from "./LanguageFlags";
import { dataLenguage } from "../../db/lenguageDb";

export default function Header() {
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex", lg: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center", lg: "center"},
        justifyContent: "center",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      {/* <NavbarBreadcrumbs /> */}
      <Stack  direction="row" sx={{ gap: 1 }}>
        <Search />
        <LanguageFlag data={dataLenguage}/>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
