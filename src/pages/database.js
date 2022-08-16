import React from "react";
import Layout from "../components/layout";
import { Link } from "gatsby";
import { Box, Breadcrumbs, Grid, Typography } from "@mui/material";

const Database = () => {
  return (
    <Layout title="База знаний">
      <Grid container className="bc-wrapper" fluid>
        <Grid item xs={12}>
          <Box className="white-box">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"}>Главная</Link>
              <Typography color="text.primary">База знаний</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Box className="white-box">
            <h1>База знаний</h1>
            <iframe className="gFrame"
                    src="https://drive.google.com/embeddedfolderview?id=1rQdo9wnOurY4Jui54ShsGH52LKEvrVBr#list"></iframe>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Database;