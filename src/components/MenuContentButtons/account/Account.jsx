import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid2";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/system";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const Account = () => {
  const { t } = useTranslation();
const payload = useSelector((ietm)=>ietm)
console.log(payload)
  return (
    <Box sx={{ width: "90%", padding: "7rem 0 0 0" }}>
      <Grid container spacing={3}>
      <FormGrid size={{ xs: 6 }}>
          <FormLabel
            htmlFor="country"
            sx={{ fontSize: 17, fontWeight: "bold" }}
          >
            {t("ID")}
          </FormLabel>
          <OutlinedInput
            name="idy"
            type="id"
            autoComplete="shipping country"
            size="small"
            sx={{
              backgroundColor: "rgba(142, 150, 171, 0.25)",
              fontSize: 17,
              color: "inherit",
            }}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel
            htmlFor="first-name"
            required
            sx={{ fontSize: 17, fontWeight: "bold" }}
          >
            {t("account.fullName")}
          </FormLabel>
          <OutlinedInput
            name="fullName"
            type="fullName"
            autoComplete="fullName"
            placeholder="John Wick"
            required
            size="small"
            sx={{
              backgroundColor: "rgba(142, 150, 171, 0.25)",
              fontSize: 17,
              color: "inherit",
            }}
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel
            htmlFor="Email"
            required
            sx={{ fontSize: 17, fontWeight: "bold" }}
          >
            {t("account.email")}
          </FormLabel>
          <OutlinedInput
            id="Email"
            name="Email"
            type="Email"
            size="small"
            placeholder="test@gmail.com"
            sx={{
              backgroundColor: "rgba(142, 150, 171, 0.25)",
              fontSize: 17,
              color: "inherit",
            }}
          />
        </FormGrid>
        <FormGrid size={{ xs: 12, md: 6 }}>
          <FormLabel
            htmlFor="last-name"
            required
            sx={{ fontSize: 17, fontWeight: "bold" }}
          >
            {t("account.password")}
          </FormLabel>
          <OutlinedInput
            name="password"
            type="password"
            required
            placeholder="*********"
            size="small"
            sx={{
              backgroundColor: "rgba(142, 150, 171, 0.25)",
              fontSize: 17,
              color: "inherit",
            }}
          />
        </FormGrid>
        
        <FormGrid size={{ xs: 6 }}>
          <FormLabel
            htmlFor="phoneNumber"
            sx={{ fontSize: 17, fontWeight: "bold" }}
          >
            {t("account.phoneNumber")}
          </FormLabel>
          <OutlinedInput
            name="phoneNumber"
            type="number"
            placeholder="(111) 111-1111"
            size="small"
            sx={{
              backgroundColor: "rgba(142, 150, 171, 0.25)",
              fontSize: 17,
              color: "inherit",
            }}
          />
        </FormGrid>
        <FormGrid size={{ xs: 6 }}>
          <FormLabel
            htmlFor="country"
            sx={{ fontSize: 17, fontWeight: "bold" }}
          >
            {t("account.country")}
          </FormLabel>
          <OutlinedInput
            name="country"
            type="country"
            placeholder="United States"
            autoComplete="shipping country"
            size="small"
            sx={{
              backgroundColor: "rgba(142, 150, 171, 0.25)",
              fontSize: 17,
              color: "inherit",
            }}
          />
        </FormGrid>
      </Grid>
      <Box sx={{ textAlign: "center", margin: "4rem auto auto auto" }}>
        <Button
          variant="contained"
          onClick={() => console.log("NEXT!!")}
          sx={{ width: { xs: "100%", sm: "fit-content", lg: "15%" } }}
        >
          Editar
          {/* {activeStep === steps.length - 1 ? 'Place order' : 'Next'} */}
        </Button>
      </Box>
    </Box>
  );
};
