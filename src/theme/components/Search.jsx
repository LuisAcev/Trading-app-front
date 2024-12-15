import FormControl from "@mui/material/FormControl";
import { instrumentName } from "../../db/assets.js";
import { SearchInstrumentBar } from "./SearchInstrumentBar";

export default function Search() {
  return (
    <FormControl
      sx={{
        width: { xs: "100%", md: "70ch", lg: "100ch" },
        marginLeft: { xs: "0rem", md: "0rem", lg: "6rem" },
        marginTop: { xs: "0.5rem", md: "1rem", lg: "1rem" },
      }}
      variant="outlined"
    >
      <SearchInstrumentBar options={instrumentName} />
    </FormControl>
  );
}
