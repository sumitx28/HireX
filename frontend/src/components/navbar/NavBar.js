// @author Raj Patel, Roshni Joshi (roshni.joshi@dal.ca), Sumit Savaliya
// This component renders the navbar

import {
  AppBar,
  Box,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../authUtility/authprovider";

const CustomToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const MenuBox = styled(Box)({
  display: "flex",
  gap: 30,
});

function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [items, setItems] = useState();

  const getNavigatePath = () => {
    if (userRole === "recruiter" || userRole === "interviewer") {
      return "";
    } else {
      return "/";
    }
  };
  const { logoutProvider, jwtToken, user } = useAuth();

  useEffect(() => {
    updateItems();
  }, []);

  useEffect(() => {
    updateItems();
  }, [jwtToken]);

  useEffect(() => {
    updateItems();
  }, [user]);

  const handleLogout = () => {
    logoutProvider();
  };

  const updateItems = () => {
    const token = jwtToken;
    const userRole = user && user.roles[0];
    if (token !== null && userRole && userRole === "recruiter") {
      setItems([
        { Name: "Home", Link: "/recruiter/home" },
        { Name: "New Job Post", Link: "/recruiter/new-job-post" },
        { Name: "Logout", Link: "/login" },
      ]);
    } else if (token !== null && userRole && userRole === "interviewer") {
      setItems([
        { Name: "Home", Link: "/recruiter/home" },
        { Name: "Interviews", Link: "/interviewschedule" },
        { Name: "Logout", Link: "/login" },
      ]);
    } else if (token !== null && userRole && userRole === "candidate") {
      setItems([
        { Name: "Home", Link: "/candidate/home" },
        { Name: "Jobs", Link: "/candidate/applied-jobs" },
        { Name: "Interviews", Link: "/interviewschedule" },
        { Name: "Logout", Link: "/login" },
      ]);
    } else {
      setItems([
        { Name: "Home", Link: "/" },
        { Name: "Login", Link: "/login" },
      ]);
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, height: "60px" }}>
        <CustomToolbar>
          <NavLink
            to={getNavigatePath}
            style={({ isActive }) => ({
              color: isActive ? "inherit" : "inherit",
              textDecorationLine: isActive ? "none" : "none",
              cursor: "pointer",
            })}
          >
            <Typography
              variant="h4"
              sx={{
                cursor: "pointer",
              }}
            >
              HireX
            </Typography>
          </NavLink>
          <MenuBox sx={{ display: { xs: "none", sm: "flex" } }}>
            {items &&
              items.map((item) => (
                <NavLink
                  key={item.Name}
                  to={item.Link}
                  onClick={() => {
                    if (item.Name == "Logout") {
                      handleLogout();
                    } else {
                      navigate(item.Link);
                    }
                  }}
                  style={({ isActive }) => ({
                    color: isActive ? "inherit" : "inherit",
                    textDecorationLine: isActive ? "underline" : "none",
                  })}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      cursor: "pointer",
                      fontSize: "90%",
                    }}
                  >
                    {item.Name}
                  </Typography>
                </NavLink>
              ))}
          </MenuBox>
          <MenuIcon
            sx={{ display: { xs: "flex", sm: "none" }, fontSize: "1.6rem" }}
            onClick={() => {
              setOpen(!open);
            }}
          ></MenuIcon>

          <Menu
            id="basic-menu"
            open={open}
            onClose={() => {
              setOpen(!open);
            }}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          ></Menu>
        </CustomToolbar>
      </AppBar>
      <CustomToolbar />
    </>
  );
}

export default NavBar;
