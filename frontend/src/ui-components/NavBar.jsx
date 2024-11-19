import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import logo from "../assets/images/Teamuplogo.png"
import SignInSignOutButton from './signoutsignin';
import Lato from "../assets/fonts/Lato-Bold.ttf"
import { AuthenticatedTemplate, UnauthenticatedTemplate } from "@azure/msal-react";
import { useIsAuthenticated } from '@azure/msal-react';
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar() {
  const isAuthenticated = useIsAuthenticated();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    if (isAuthenticated)
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    if (isAuthenticated)
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const navigate = useNavigate();

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    
    <Menu
   
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
       {isAuthenticated && (
      <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
        Profile
      </MenuItem>
     
    )}
    {isAuthenticated && (
      <SignInSignOutButton  />
    )}
      
   
      {/* <MenuItem component={Link} to="/logout" onClick={handleMenuClose}>
        Sign Out
      </MenuItem> */}
   
    </Menu>
 
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={Link} to="/chat">
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem component={Link} to="/chats">
        <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem component={Link} to="/profile" onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static"
        color="primary"
        sx={{
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
       <Toolbar sx={{ gap: '6px' }}>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'primary.main', // Optional: Add a background color
      padding: '2px 4px',
      borderRadius: '8px',
      cursor: 'pointer',
      gap: '2px',
    }}
    onClick={() => navigate('/')}
  >
    <img
      src={logo}
      alt="Logo"
      style={{ height: '40px', marginRight: '0px' }}
    />
    <Typography
      variant="h6"
      noWrap
      component="div"
      sx={{
        color: '#fff', // Match text color with the background
        display: { xs: 'none', sm: 'block' },
        fontWeight: 'bold',
        marginLeft: '-8px',
      }}
    >
      TeamUp
    </Typography>
  </Box>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        <AuthenticatedTemplate>
          <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    gap: '6px',
  }}
  onClick={() => navigate('/create-post')}
>
  <IconButton
    size="large"
    aria-label="create a new post"
    color="inherit"
  >
    <AddCircleOutlineIcon />
  </IconButton>
  <Typography
    variant="body1"
    sx={{ display: { xs: 'none', md: 'block' }, fontWeight: 'bold' }}
  >
    Create Post
  </Typography>
</Box>

</AuthenticatedTemplate> 
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {isAuthenticated && (
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={() => navigate('/chats')}>
             
              <Badge badgeContent={0} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
             )}
              {isAuthenticated && (
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              
            >
              
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
              )}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              
              onClick={handleProfileMenuOpen}
             
              color="inherit"
            >
           
              <AccountCircle />
            </IconButton>
           
           
          </Box>
         
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
                  
          </Box>
         
        </Toolbar>
       
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    
    </Box>
    
  );
}