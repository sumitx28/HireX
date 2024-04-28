// @author Raj Patel

import { AppBar, Box, Toolbar, Typography, styled } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Link, NavLink } from "react-router-dom";

const CustomToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "flex-end",
});

const MenuBox = styled(Box)({
  display: "flex",
  gap: 30,
});

const menuItems = [
  { Name: "FAQs", Link: "/faq" },
  { Name: "Contact Us", Link: "/contact-us" },
];

function Footer() {
  return (
    <Box sx={{ position: "relative", minHeight: "10vh" }}>
      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
        <CustomToolbar>
          <MenuBox sx={{ display: "flex" }}>
            <MenuBox sx={{ display: "flex" }}>
              <Link
                to="https://facebook.com"
                target="_blank"
                style={{ color: "white" }}
              >
                <FacebookIcon />
              </Link>
              <Link
                to="https://x.com"
                target="_blank"
                style={{ color: "white" }}
              >
                <XIcon />
              </Link>
              <Link
                to="https://instagram.com"
                target="_blank"
                style={{ color: "white" }}
              >
                <InstagramIcon />
              </Link>
              <Link
                to="https://linkedin.com"
                target="_blank"
                style={{ color: "white" }}
              >
                <LinkedInIcon />
              </Link>
            </MenuBox>
            <MenuBox sx={{ display: "flex" }}>
              {menuItems.map((item) => (
                <NavLink
                  to={item.Link}
                  style={({ isActive }) => ({
                    color: isActive ? "inherit" : "inherit",
                    textDecorationLine: isActive ? "underline" : "none",
                  })}
                  key={item.Name}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      cursor: "pointer",
                      fontSize: "80%",
                    }}
                  >
                    {item.Name}
                  </Typography>
                </NavLink>
              ))}
            </MenuBox>
          </MenuBox>
        </CustomToolbar>
      </AppBar>
    </Box>
  );
}

export default Footer;
