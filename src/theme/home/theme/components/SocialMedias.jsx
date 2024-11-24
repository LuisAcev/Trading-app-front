import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import FacebookIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function SocialMedias() {
  return (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      sx={{ justifyContent: "left", color: "text.secondary" }}
    >
      <IconButton
        color="inherit"
        size="small"
        href="https://github.com/LuisAcev?tab=repositories"
        aria-label="GitHub"
        sx={{ alignSelf: "center" }}
      >
        <FacebookIcon />
      </IconButton>

      <IconButton
        color="inherit"
        size="small"
        href="https://www.linkedin.com/in/luisfelipevigoya/"
        aria-label="LinkedIn"
        sx={{ alignSelf: "center" }}
      >
        <LinkedInIcon />
      </IconButton>
    </Stack>
  );
}
