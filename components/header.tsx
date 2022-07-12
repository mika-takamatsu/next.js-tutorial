import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import { useState } from "react";

type LayoutProps = {
  children?: React.ReactNode;
};

type Anchor = "top" | "left" | "bottom" | "right";

const Header = ({ children }: LayoutProps) => {
  const [state, setState] = useState({
    top: false,
  });

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, ["top"]: open });
  };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: "auto" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["home", "about", "count", "hooks"].map((text) => (
          <ListItem key={text} component="a" href={text === "home" ? "/" : text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <PetsIcon />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer("top", true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="top" open={state["top"]} onClose={toggleDrawer("top", false)}>
              {list("top")}
            </Drawer>
            <Typography variant="h6" component={"div"} sx={{ flexGrow: 1 }}>
              Next.js sample website
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {children}
    </>
  );
};

export default Header;
