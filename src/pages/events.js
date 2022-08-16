import React from "react";
import Layout from "../components/layout";
import Calendar from "@ericz1803/react-google-calendar";
import { Link } from "gatsby";
import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";


const Events = () => {

  const API_KEY = "AIzaSyCUAApKVNpLIpfRQMt62or4CAyOg5I5pNQ";
  let calendars = [
    {
      calendarId: "8giv6or01spg72tjiemuas7fv8@group.calendar.google.com",
      color: "#ff4141"
    }
  ];
  let styles = {
    calendar: {
      borderWidth: "3px"
    },
    today: {
      color: "red",
      background: "#e1ffc5"
    }
  };
  return (
    <Layout title={"События"}>
      <Grid container className="bc-wrapper">
        <Grid item xs={12}>
          <Box className="white-box">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"}>Главная</Link>
              <Typography color="text.primary">События</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>


      <Grid container>
        <Grid item xs={12}>
          <Box className="white-box">
            <Calendar apiKey={API_KEY} calendars={calendars} language={"RU"} styles={styles} />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Events;