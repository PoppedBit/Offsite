import { AccountCircle, BugReport, Login, Logout, Menu as MenuIcon } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GUID, TODO } from 'shared/types';
import {
  NavDrawer,
  NavDrawerActions,
  NavDrawerCloseIcon,
  NavDrawerContent,
  NavDrawerHeader
} from './styles';
import { icons } from 'shared/utils';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from 'store/slices/user';
import { useForm } from 'react-hook-form';

interface NavMenuItemProps {
  id: GUID;
  label: string;
  route: string;
  icon: string;
  handleCloseNavMenu: Function;
  navigation: TODO[];
}

const NavigationMenuItem = (props: NavMenuItemProps) => {
  const { id, label, route, icon, handleCloseNavMenu, navigation } = props;

  const children = navigation
    .filter((nav: TODO) => {
      const { parentId = null } = nav;
      return parentId === id;
    })
    .map((n) => {
      const { id, label, route, icon } = n;
      return (
        <NavigationMenuItem
          key={id}
          id={id}
          label={label}
          route={route}
          icon={icon}
          handleCloseNavMenu={handleCloseNavMenu}
          navigation={navigation}
        />
      );
    });

  const hasChildren = children.length > 0;

  return (
    <>
      <ListItemButton component={Link} to={route} onClick={() => handleCloseNavMenu()}>
        <ListItemIcon>{icons[icon]}</ListItemIcon>
        <ListItemText>{label}</ListItemText>
      </ListItemButton>
      {hasChildren && <List sx={{ pl: 4 }}>{children}</List>}
    </>
  );
};

interface MenuProps {
  navigation: TODO[];
}

export const NavigationMenu = (props: MenuProps) => {
  const { navigation = [] } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: TODO) => state.user.user);

  const { register, handleSubmit, reset } = useForm();
  const { handleSubmit: handleBugReport } = useCreateBugReport();

  const [isOpen, setIsOpen] = useState(false);
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);

  const handleClickBugReport = () => {
    setIsBugReportOpen(true);
    setIsOpen(false);
  };

  const handleSubmitBugReport = (data: TODO) => {
    const url = location.pathname;
    handleBugReport({
      ...data,
      url,
      userAgent: navigator.userAgent,
      resolution: `${window.innerWidth}x${window.innerHeight}`
    });
    handleCloseBugReport();
  };

  const handleCloseBugReport = () => {
    setIsBugReportOpen(false);
    reset({
      message: ''
    });
  };

  return (
    <>
      <IconButton color="inherit" onClick={() => setIsOpen(true)}>
        <MenuIcon />
      </IconButton>
      <NavDrawer open={isOpen} onClose={() => setIsOpen(false)}>
        <NavDrawerHeader onClick={() => setIsOpen(false)}>
          <NavDrawerCloseIcon />
        </NavDrawerHeader>
        <NavDrawerContent>
          <List>
            {navigation
              .filter((nav: TODO) => {
                const { parentId = null } = nav;
                return parentId === null;
              })
              .map((n: TODO) => {
                const { id, label, route, icon } = n;
                return (
                  <NavigationMenuItem
                    key={id}
                    id={id}
                    label={label}
                    route={route}
                    icon={icon}
                    handleCloseNavMenu={() => setIsOpen(false)}
                    navigation={navigation}
                  />
                );
              })}
          </List>
          <NavDrawerActions>
            {user?.id && (
              <>
                <Divider />
                <ListItemButton onClick={handleClickBugReport}>
                  <ListItemIcon>
                    <BugReport />
                  </ListItemIcon>
                  <ListItemText>Report A Bug</ListItemText>
                </ListItemButton>
                <Divider />
                <ListItemButton component={Link} to={'/account'} onClick={() => setIsOpen(false)}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText>My Account</ListItemText>
                </ListItemButton>
                <ListItemButton
                  onClick={() => {
                    localStorage.removeItem(import.meta.env.VITE_AUTH_TOKEN);
                    dispatch(clearUser());
                    navigate('/');
                    setIsOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <Logout />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </ListItemButton>
              </>
            )}
            {user && !user.id && (
              <>
                <Divider />
                <ListItemButton component={Link} to={'/login'} onClick={() => setIsOpen(false)}>
                  <ListItemIcon>
                    <Login />
                  </ListItemIcon>
                  <ListItemText>Log In</ListItemText>
                </ListItemButton>
                <ListItemButton component={Link} to={'/register'} onClick={() => setIsOpen(false)}>
                  <ListItemIcon>
                    <AccountCircle />
                  </ListItemIcon>
                  <ListItemText>Register</ListItemText>
                </ListItemButton>
              </>
            )}
          </NavDrawerActions>
        </NavDrawerContent>
      </NavDrawer>
    </>
  );
};
