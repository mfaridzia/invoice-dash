import {
  AppBar,
  Toolbar,
  IconButton,
  Switch,
  Avatar,
  Box,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export function Header() {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider", background: "white" }}
    >
      <Toolbar sx={{ justifyContent: "flex-end", gap: 2 }}>
        <Switch />
        <IconButton>
          <NotificationsIcon />
        </IconButton>
        <IconButton>
          <MarkChatUnreadOutlinedIcon />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ textAlign: "right" }}>
            <Box
              component="span"
              sx={{
                display: "block",
                fontWeight: "bold",
                color: "black",
                fontSize: "16px",
              }}
            >
              John Doe
            </Box>
            <Box
              component="span"
              sx={{
                display: "block",
                fontSize: "0.7rem",
                color: "text.primary",
              }}
            >
              Verified Member
            </Box>
          </Box>
          <Avatar src="https://aui.atlassian.com/aui/latest/docs/images/avatar-person.svg" />
          <IconButton>
            <KeyboardArrowDownIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
