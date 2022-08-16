import * as React from "react";
import { useEffect, useState } from "react";
import { Link } from "gatsby";
import { AUTH_TOKEN } from "../constants";
import { getUser } from "../services/auth";
import { CartContext } from "../context/CartContext";
import logo from "../assets/images/logo2.svg";
import {
  Avatar,
  Badge,
  Box, Button,
  Divider, Drawer,
  Grid,
  IconButton, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from "@mui/material";
import { Logout } from "@mui/icons-material";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import LoginIcon from '@mui/icons-material/Login';
import DnsIcon from "@mui/icons-material/Dns";
import SummarizeIcon from "@mui/icons-material/Summarize";
import dateFormat from "dateformat";
import { useLazyQuery } from "@apollo/client";
import { GET_NEW_ORDERS } from "../apollo/queries";
import NotificationSound from "../assets/sound/sound.mp3"
import useSound from 'use-sound';
import ArticleIcon from "@mui/icons-material/Article";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import HomeIcon from '@mui/icons-material/Home';
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header() {

  const authToken = typeof window !== "undefined" ? localStorage.getItem(AUTH_TOKEN) : null
  const value = React.useContext(CartContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [today, setToday] = React.useState(new Date());
  const [orders, setOrders] = useState([]);
  const [play] = useSound(NotificationSound);
  const [drawerState, setDrawerState] = React.useState(false);


  const variables = {
    day: parseInt(dateFormat(today, "dd")),
    month: parseInt(dateFormat(today, "mm"))
  };

  const [getStatus, { loading, error, data }] = useLazyQuery(GET_NEW_ORDERS,
    {
      variables,
      notifyOnNetworkStatusChange: true,
      pollInterval: 5000
    }
  );

  const playAudio = () => {
    play()
  }

  useEffect(() => {
    if(data && data.orders){
      setOrders(data.orders.nodes.filter(item => item.status === 'PENDING'));
      if(data.orders.nodes.filter(item => item.status === 'PENDING').length > 0){
        playAudio()
      }
    }
  }, [data]);



  useEffect(() => {
    if(getUser().username === 'sklad') {
      getStatus();
    }
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <header className={"header"}>
        <Grid container spacing={3}>
          <Grid item xs={2} md={0} className={"mobile-menu-wrapper"}>
            <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <Button className={"mobile-menu"} onClick={()=>setDrawerState(true)}>
              <MenuIcon></MenuIcon>
            </Button>
            </Box>
          </Grid>
          <Grid item xs={8} md={10} className="top-menu-wrapper">

              <Link to={"/"} className="logo-a">
                <img src={logo} alt="logo" width="100px" className={"logo"} />
              </Link>

            <Box className={"top-menu"}
                 sx={{ display: "flex", alignItems: "center", textAlign: "center", height: "60px" }}>
              {authToken && getUser().username !== "sklad" ? (
                  <Typography><Link to={"/categories"}>Заявка на склад</Link></Typography>
              ) : null}
              <Typography><Link to={"/news"}>Новости</Link></Typography>
              <Typography><Link to={"/obv"}>Объявления</Link></Typography>
              <Typography><Link to={"/events"}>События</Link></Typography>
              <Typography><Link to={"/database"}>База знаний</Link></Typography>
            </Box>
          </Grid>
          <Grid item xs={2} md={2}>
            <Box sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              textAlign: "center",
              height: "60px"
            }}>
              {authToken ? (
                <>
                  <Badge badgeContent={
                    getUser().username === 'sklad' ? (
                      orders && orders.length > 0 ? (
                        <span className={"active"}>{orders.length}</span>
                      ) : null
                    ) : (
                    value && value[0] && value[0].length > 0 ? (
                    <span className={"active"}>{value[0].length}</span>
                  ) : null )
                  } color="error" className="topmenu-badge">
                    <Box sx={{ m: 1, position: "relative" }}>
                      <Tooltip title="Мой аккаунт">
                        <IconButton
                          onClick={handleClick}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <Avatar sx={{ width: 32, height: 32 }}>
                            {
                              getUser().username.slice(0, 1)
                            }
                          </Avatar>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Badge>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1
                        },
                        "&:before": {
                          content: "\"\"",
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0
                        }
                      }
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem component={Link} to="/profile">
                      <Avatar />{getUser().name}
                    </MenuItem>
                    <Divider />
                    <MenuItem component={Link} to="/cart">
                      <Badge badgeContent={
                        value && value[0] && value[0].length > 0 ? (
                        <span className={"active"}>{value[0].length}</span>
                      ) : null} color="success" className="topmenu-badge">
                        <ListItemIcon>
                          <SummarizeIcon fontSize="small" />
                        </ListItemIcon>
                        Заявка &nbsp;
                      </Badge>
                    </MenuItem>
                    <Divider />
                    <MenuItem component={Link} to="/myorders">
                      <ListItemIcon>
                        <ViewStreamIcon fontSize="small" />
                      </ListItemIcon>
                      Мои заявки
                    </MenuItem>

                    {authToken && getUser().username === "sklad" ? (
                      <MenuItem component={Link} to="/sklad">
                        <Badge badgeContent={
                          getUser().username === 'sklad' && (
                            orders && orders.length > 0 ? (
                              <span className={"active"}>{orders.length}</span>
                            ) : null
                          )
                        } color="success">
                        <ListItemIcon>
                          <DnsIcon fontSize="small" />
                        </ListItemIcon>
                        Все заявки &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Badge>
                      </MenuItem>
                    ) : null}

                    <MenuItem component={Link} to="/logout">
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Выйти
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button> <Link
                  to="/login"
                  className="ml1 no-underline black"
                >
                  <LoginIcon />
                </Link></Button>
              )}
            </Box>
          </Grid>


        </Grid>
        <Drawer
          anchor={'left'}
          open={drawerState}
          onClose={()=>setDrawerState(false)}
          onOpen={()=>setDrawerState(true)}
        >
          <Box
            sx={{ width:  250 }}
            role="presentation"
            onClick={()=>setDrawerState(false)}
            onKeyDown={()=>setDrawerState(false)}
          >
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={"/"}>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={"Главная"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={"/categories"}>
                <ListItemIcon>
                  <LocalPharmacyIcon />
                </ListItemIcon>
                <ListItemText primary={"Заявка на склад"} />
              </ListItemButton>
            </ListItem>
              <ListItem disablePadding>
                <ListItemButton component={Link} to={"/obv"}>
                  <ListItemIcon>
                    <ArticleIcon />
                  </ListItemIcon>
                  <ListItemText primary={"Объявления"} />
                </ListItemButton>
              </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={"/news"}>
                <ListItemIcon>
                  <NewspaperIcon />
                </ListItemIcon>
                <ListItemText primary={"Новости"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={"/events"}>
                <ListItemIcon>
                  <CalendarMonthIcon />
                </ListItemIcon>
                <ListItemText primary={"События"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to={"/database"}>
                <ListItemIcon>
                  <AutoStoriesIcon />
                </ListItemIcon>
                <ListItemText primary={"База знаний"} />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />

          </Box>
        </Drawer>

      </header>
    </>
  );
}
