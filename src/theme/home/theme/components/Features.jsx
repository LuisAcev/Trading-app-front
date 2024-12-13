import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import MuiChip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import EdgesensorHighRoundedIcon from "@mui/icons-material/EdgesensorHighRounded";
import ViewQuiltRoundedIcon from "@mui/icons-material/ViewQuiltRounded";
import { useTranslation } from "react-i18next";
import { SwipeFeatures } from "./features/SwipeFeatures";

const Chip = styled(MuiChip)(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => selected,
      style: {
        background:
          "linear-gradient(to bottom right, hsl(210, 98%, 48%), hsl(210, 98%, 35%))",
        color: "hsl(0, 0%, 100%)",
        borderColor: (theme.vars || theme).palette.primary.light,
        "& .MuiChip-label": {
          color: "hsl(0, 0%, 100%)",
        },
        ...theme.applyStyles("dark", {
          borderColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));

export function MobileLayout({
  selectedItemIndex,
  handleItemClick,
  selectedFeature,
}) {
  const items = [
    {
      icon: <ViewQuiltRoundedIcon />,
      title: "Dashboard",
      description:
        "This item could provide a snapshot of the most important metrics or data points related to the product.",
      imageLight: `url("${
        process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
      }/static/images/templates/templates-images/dash-light.png")`,
      imageDark: `url("${
        process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
      }/static/images/templates/templates-images/dash-dark.png")`,
    },
    {
      icon: <EdgesensorHighRoundedIcon />,
      title: "Mobile",
      description:
        "This item could provide information about the mobile app version of the product.",
      imageLight: `url("${
        process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
      }/static/images/templates/templates-images/mobile-light.png")`,
      imageDark: `url("${
        process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
      }/static/images/templates/templates-images/mobile-dark.png")`,
    },
  ];
  if (!items[selectedItemIndex]) {
    return null;
  }
  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "none" },
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", gap: 2, overflow: "auto" }}>
        {items.map(({ title }, index) => (
          <Chip
            size="medium"
            key={index}
            label={title}
            onClick={() => handleItemClick(index)}
            selected={selectedItemIndex === index}
          />
        ))}
      </Box>
      <Card variant="outlined">
        <SwipeFeatures />
        <Box sx={{ px: 2, pb: 2 }}>
          <Typography
            gutterBottom
            sx={{ color: "text.primary", fontWeight: "medium" }}
          >
            {selectedFeature.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary", mb: 1.5 }}>
            {selectedFeature.description}
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}

export default function Features() {
  const { t } = useTranslation();
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };
  const items = [
    {
      icon: <ViewQuiltRoundedIcon />,
      title: "Dashboard",
      description: t("home.features.items.dashboard"),
      imageLight: `url("${
        process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
      }/static/images/templates/templates-images/dash-light.png")`,
      imageDark: `url("${
        process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
      }/static/images/templates/templates-images/dash-dark.png")`,
    },
    {
      icon: <EdgesensorHighRoundedIcon />,
      title: "Mobile",
      description: t("home.features.items.mobil"),
      imageLight: `url("${
        process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
      }/static/images/templates/templates-images/mobile-light.png")`,
      imageDark: `url("${
        process.env.TEMPLATE_IMAGE_URL || "https://mui.com"
      }/static/images/templates/templates-images/mobile-dark.png")`,
    },
  ];
  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id="features" sx={{ py: { xs: 8, sm: 16 } }}>
      <Box sx={{ width: { sm: "100%", md: "60%" } }}>
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary" }}
        >
          {t("home.features.product.product")}
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
        >
          {t("home.features.product.legend")}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row-reverse" },
          gap: 2,
        }}
      >
        <div>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {items.map(({ icon, title, description }, index) => (
              <Box
                key={index}
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={[
                  (theme) => ({
                    p: 2,
                    height: "100%",
                    width: "70%",
                    "&:hover": {
                      backgroundColor: (theme.vars || theme).palette.action
                        .hover,
                    },
                  }),
                  selectedItemIndex === index && {
                    backgroundColor: "action.selected",
                  },
                ]}
              >
                <Box
                  sx={[
                    {
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "left",
                      gap: 1,
                      textAlign: "left",
                      textTransform: "none",
                      color: "text.secondary",
                    },
                    selectedItemIndex === index && {
                      color: "text.primary",
                    },
                  ]}
                >
                  {icon}

                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="body2">{description}</Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <MobileLayout
            selectedItemIndex={selectedItemIndex}
            handleItemClick={handleItemClick}
            selectedFeature={selectedFeature}
          />
        </div>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            width: { xs: "100%", md: "57%", lg: "57%" },
            height: "var(--items-image-height)",
            padding: "0 0 0 0",
            margin: "0 0 0 0",
          }}
        >
          <Card variant="outlined">
            <SwipeFeatures />
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
