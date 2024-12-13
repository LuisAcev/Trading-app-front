import FormControl from "@mui/material/FormControl";
import { instrumentName } from "../../db/assets.js";
import { SearchInstrumentBar } from "./SearchInstrumentBar";

export default function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "50ch", lg:"90ch" } }} variant="outlined">
      <SearchInstrumentBar options ={instrumentName}/>
    </FormControl>
  );
}
