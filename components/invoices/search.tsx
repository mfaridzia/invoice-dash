import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function Search({
  search,
  onChangeSearch,
}: {
  search: string;
  onChangeSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <TextField
      type="search"
      placeholder="Search"
      value={search}
      onChange={onChangeSearch}
      size="small"
      sx={{
        width: "260px",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white",
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
