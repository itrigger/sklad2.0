import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import { getUser } from "../services/auth";
import { AUTH_TOKEN } from "../constants";
import { Link, navigate } from "gatsby";
import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";


const Profile = () => {

  const authToken = typeof window !== "undefined" && localStorage.getItem(AUTH_TOKEN);

  if (!authToken && typeof window !== "undefined") {
    navigate("/login");
  }
  return (
    <>
      <Layout title={"Мой профиль"}>
        <Grid container className="bc-wrapper">
          <Grid item xs={12}>
            <Box className="white-box">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"}>Главная</Link>
              <Typography color="text.primary">Мой профиль</Typography>
            </Breadcrumbs>
            </Box>
          </Grid>
        </Grid>

        <Grid container>

            <Grid item xs={12}>
              <Box className="white-box">
              <h1>Мой профиль</h1>

                <div>Имя: {getUser().name}</div>
                <div>E-mail: {getUser().email}</div>
                <div>
                  <Link to="/myorders">Мои заявки</Link>
                </div>

              </Box>
            </Grid>

        </Grid>
      </Layout>
    </>
  );
};

export default Profile;