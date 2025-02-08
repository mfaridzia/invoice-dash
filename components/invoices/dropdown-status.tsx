import { TextField, MenuItem as MenuItemMUI } from "@mui/material";
import { OPTION_STATUS } from "@/constants";

export function DropdownStatus({
  status,
  onChangeStatus,
}: {
  status: string;
  onChangeStatus: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <TextField
      select
      value={status}
      onChange={onChangeStatus}
      size="small"
      sx={{
        width: "160px",
        "& .MuiOutlinedInput-root": {
          backgroundColor: "white",
        },
      }}
    >
      {OPTION_STATUS.map((status) => (
        <MenuItemMUI key={status} value={status}>
          {status}
        </MenuItemMUI>
      ))}
    </TextField>
  );
}
