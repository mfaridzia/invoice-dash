import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { Add as AddIcon, List as ListIcon } from "@mui/icons-material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

const drawerWidth = 240;

export function Sidebar() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "rgb(28, 32, 42)",
          color: "white",
        },
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography fontWeight="bold" sx={{ mt: "-5px", fontSize: "25px" }}>
          InvoiceHub
        </Typography>
      </Box>

      <Typography
        variant="overline"
        sx={{ px: 3, mt: "21px", color: "grey.500" }}
      >
        MENU
      </Typography>

      <List>
        <ListItemButton
          component={NextLink}
          href="/invoices/add"
          selected={pathname === "/invoices/add"}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.12)",
            },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add Invoice" />
        </ListItemButton>

        <ListItemButton
          component={NextLink}
          href="/invoices/list"
          selected={pathname === "/invoices/list"}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
            "&.Mui-selected:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.12)",
            },
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.04)",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <ListIcon />
          </ListItemIcon>
          <ListItemText primary="My Invoices" />
        </ListItemButton>
      </List>
    </Drawer>
  );
}
