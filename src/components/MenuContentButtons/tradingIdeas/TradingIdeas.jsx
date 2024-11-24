import { motion } from "framer-motion";
import Grid from "@mui/joy/Grid";
import { ThemeProvider, extendTheme, THEME_ID } from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { Box } from "@mui/material";
import { MediaCard } from "./cardTradingIdeas/CardTi";
import { tradingIdeasDb } from "../../../db/tradingIdeasDb";

const materialTheme = extendTheme();

export const TradingIdeas = () => {
  return (
    <ThemeProvider theme={{ [THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider>
        <Box>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {tradingIdeasDb.map((item, i) => (
              <Grid key={i} size={6}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{
                    duration: 0.4,
                    delay: i * 0.3, 
                  }}
                >
                  <MediaCard
                    title={item.title}
                    img={item.img}
                    text={item.text}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Box>
      </JoyCssVarsProvider>
    </ThemeProvider>
  );
};
