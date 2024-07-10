import React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

type HeaderPropTypes = {
  isAdmin: boolean;
};

const Header = ({ isAdmin }: HeaderPropTypes) => {
  const navigateText = isAdmin ? "To Support" : "To Admin";
  const headerText = isAdmin ? "Admin Page" : "Support Page";
  const navigateRoute = isAdmin ? "/" : "/admin";

  const navigate = useNavigate();
  const clickHandler = () => {
    navigate(navigateRoute);
  };
  return (
    <Box sx={{ flexGrow: 1 }} marginBottom={8}>
      <AppBar position="static" color="inherit">
        <Button color="inherit" onClick={clickHandler}>
          {navigateText}
        </Button>
        {headerText}
      </AppBar>
    </Box>
  );
};

export default Header;
