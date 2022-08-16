import * as React from "react";
import { useEffect, useState } from "react";
import Layout from "../components/layout";
import { Helmet } from "react-helmet";
import { gapi } from "gapi-script";
import { useQuery } from "@apollo/client";
import { GET_ALL_ADVS, GET_ALL_NEWS } from "../apollo/queries";
import dateFormat from "dateformat";
import { Link } from "gatsby";
import { Box, Button, CircularProgress, Grid } from "@mui/material";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArticleIcon from "@mui/icons-material/Article";

export default function Homepage() {
  const [events, setEvents] = useState([]);
  const [news, setNews] = useState([]);
  const [advs, setAdvs] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const { loading: loadingNews, error: errorNews, data: dataNews } = useQuery(GET_ALL_NEWS);
  const { loading: loadingAdv, error: errorAdv, data: dataAdv } = useQuery(GET_ALL_ADVS);


  //https://fusebit.io/blog/google-calendar-react/?utm_source=www.google.com&utm_medium=referral&utm_campaign=none
  //https://developers.google.com/oauthplayground/?code=4/0AdQt8qh4WjBKPj2JDFSVDdNZwflNbyMnpB7apNM06yw7LDb6suewpNBlCsPIb_uQ-R_Q6w&scope=https://www.googleapis.com/auth/calendar.events
  const calendarID = "8giv6or01spg72tjiemuas7fv8@group.calendar.google.com";
  const apiKey = "AIzaSyCUAApKVNpLIpfRQMt62or4CAyOg5I5pNQ";
  const accessToken = "ya29.A0AVA9y1s7mS2BJ0VaHUEzMcldgv1hVsRXdJyneM7EsdKgM-0-Vh8WP5CrGtn5IlSSkPsZia_lMECyvFIEm6v5rVAlcLPSCu2VgrcoEmJg_81T7bIHoc9S8VNcdPJUaALzNPqf9OARNrVMp6qJzLlbgLOUhzofaCgYKATASATASFQE65dr8xP77QaWV7LzFZRz9OEWVTA0163";
  const date = new Date();
  const currentDay = date.toISOString();


  useEffect(() => {
    if (dataNews) {
      setNews(dataNews.posts.nodes);

    }
  }, [dataNews]);

  useEffect(() => {
    if (dataAdv) {
      setAdvs(dataAdv.posts.nodes);

    }
  }, [dataAdv]);


    const getEvents = (calendarID, apiKey) => {
      function initiate() {
        gapi.client
          .init({
            apiKey: apiKey
          })
          .then(function() {
            return gapi.client.request({
              path: `https://www.googleapis.com/calendar/v3/calendars/${calendarID}/events?maxResults=10&timeMin=${currentDay}`
            });
          })
          .then(
            (response) => {
              let events = response.result.items;
              setEvents(events);
              setLoadingEvents(false);
            },
            function(err) {
              return [false, err];
            }
          );
      }
      gapi.load("client", initiate);
    };


  useEffect(() => {
      const events = getEvents(calendarID, apiKey);
      setEvents(events);
  }, []);

  const locClickHandler = function(location) {
    if (typeof window !== "undefined") {
      window.location = "https://www.google.com/maps/place/" + location;
    }
  };

  return (
    <>
      <Layout title={"Внутренний портал Суши Хиро"}>
        <Grid container spacing={3} className="mainpage-section">
          <Grid item xs={12} md={6} className="white-box-wrap">
            <Box className="white-box">
              <h3>Объявления {loadingAdv ? <CircularProgress /> : ""} <ArticleIcon /></h3>
              <div className="mainpage-posts">
                {advs?.map((post) => (
                  <div className="mainpage-post" key={post.databaseId}>
                    <div className="mainpage-post--date date">{dateFormat(post.date, "dd.mm")}</div>
                    <div className="mainpage-post--title">
                      <Link to={`/obv/${post.databaseId}`}>{post.title}</Link>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outlined" component={Link} to={"/obv"} sx={{ marginTop: "20px" }}>Все
                объявления</Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} className="white-box-wrap">
            <Box className="white-box">
              <h3>Новости {loadingNews ? <CircularProgress /> : ""} <NewspaperIcon /></h3>
              <div className="mainpage-posts">
                {news?.map((post) => (
                  <div className="mainpage-post" key={post.databaseId}>
                    <div className="mainpage-post--date date">{dateFormat(post.date, "dd.mm")}</div>
                    <div className="mainpage-post--title">
                      <Link to={`/news/${post.databaseId}`}>{post.title}</Link>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outlined" component={Link} to={"/news"} sx={{ marginTop: "20px" }}>Все новости</Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mainpage-section">
          <Grid item xs={12} md={6} className="white-box-wrap">
            <Box className="white-box">
              <h3>События {loadingEvents ? <CircularProgress /> : ""} <CalendarMonthIcon /></h3>

                {events ? events.map((event) => (
                  <div className="mainpage-post"  key={event.id}>
                    <div className="mainpage-post--date date">{dateFormat(event.start.date, "dd.mm")}</div>
                    <div className="mainpage-post--title">{event.summary} - {event.description}</div>
                    {event.location ? (
                      <button onClick={() => locClickHandler(event.location)}>{event.location}</button>) : <></>}
                  </div>
                )) :
                <h5>Нет предстоящих событий</h5>
                }

              <Button variant="outlined" component={Link} to={"/events"} sx={{ marginTop: "20px" }}>Все события</Button>
            </Box>
          </Grid>
        </Grid>

      </Layout>
    </>
  );
}
