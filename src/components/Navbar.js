import MenuIcon from "@mui/icons-material/Menu";
import { useState, Fragment } from "react";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import supabase from "../config";

const Navbar = ({ className }) => {
  const user = supabase.auth.user();

  const navigate = useNavigate();
  const [state, setState] = useState({
    left: false,
  });

  const loggedIn = {
    first: [],
    second: [
      { name: "🏡Dashboard.", link: "/" },
      { name: "➡️ Logout.", link: "/logout" },
    ],
  };
  const notLoggedIn = {
    first: [
      { name: "🔒 Login.", link: "/login" },
      { name: "👤 Register.", link: "/register" },
    ],
    second: [],
  };

  const contents = user ? loggedIn : notLoggedIn;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {contents.first.map((content, index) => (
          <ListItem key={content.name} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(content.link);
              }}
            >
              <ListItemText primary={content.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {contents.second.map((content, index) => (
          <ListItem key={content.name} disablePadding>
            <ListItemButton
              onClick={() => {
                navigate(content.link);
              }}
            >
              <ListItemText primary={content.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <Fragment key={anchor}>
          <div className={className ? className : "navbar"}>
            <MenuIcon
              className="menu-icon"
              onClick={toggleDrawer(anchor, true)}
            />
            <h2 className="logo">Mental Aarog</h2>
          </div>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </Fragment>
      ))}
    </div>
  );
};

export default Navbar;
