import Box from "@mui/joy/Box";
import Table from "@mui/joy/Table";
import { ThemeProvider, extendTheme, THEME_ID } from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { useTranslation } from "react-i18next";
import { economicCalendarDb } from "../../../db/economicCalendarDb";
import { labelColor } from "./utils";
import { Rating } from "@mui/material";

const materialTheme = extendTheme();

export const EconomicCalendar = () => {
  const { t } = useTranslation();
  return (
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <Box sx={{ width: { xs: "25rem", md: "45rem", lg: "75rem" } }}>
          <Table
            aria-label="table variants"
            variant={"plain"}
            color={"neutral"}
            sx={{
              marginTop: "4rem",
              borderWidth: "3px",
              borderStyle: "solid",
              borderColor: "black",
              backgroundColor: "rgba(196, 201, 209, 0.36)",
              borderRadius: "10px",
              color: "inherit",
              fontSize: { xs: "0.6rem", md: "1rem" },
            }}
          >
            <thead>
              <tr>
                <th style={{ fontWeight: "bold" }}>
                  {t("economicCalendar.date")}
                </th>
                <th style={{ fontWeight: "bold" }}>
                  {t("economicCalendar.event")}
                </th>
                <th style={{ fontWeight: "bold" }}>
                  {t("economicCalendar.actual")}
                </th>
                <th style={{ fontWeight: "bold" }}>
                  {t("economicCalendar.forecast")}
                </th>
                <th style={{ fontWeight: "bold" }}>
                  {t("economicCalendar.frevious")}
                </th>
                <th style={{ fontWeight: "bold" }}>
                  {t("economicCalendar.impact")}
                </th>
              </tr>
            </thead>
            <tbody>
              {economicCalendarDb.data.map((row, i) => (
                <tr key={i}>
                  <td>{row.date}</td>
                  <td style={{ fontWeight: "bold" }}>{row.event}</td>
                  <td
                    style={{ color: labelColor(row.actual) }}
                  >{`${row.actual}%`}</td>
                  <td
                    style={{ color: labelColor(row.forecast) }}
                  >{`${row.forecast}%`}</td>
                  <td
                    style={{ color: labelColor(row.previous) }}
                  >{`${row.previous}%`}</td>
                  <td>
                    <Rating
                      name="impact"
                      value={row.impact}
                      max={3}
                      readOnly
                      sx={{ fontSize: { xs: "1rem", md: "2rem" } }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Box>
      </JoyCssVarsProvider>
    </ThemeProvider>
  );
};
