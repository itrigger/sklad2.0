import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { AUTH_TOKEN } from "../../constants";
import { Link, navigate } from "gatsby";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../apollo/queries";
import { Box, Breadcrumbs, Button, Grid, Skeleton, Snackbar, Typography } from "@mui/material";
import { Alert } from '@mui/material'

const Index = () => {
  const authToken = typeof window !== "undefined" && localStorage.getItem(AUTH_TOKEN);
  const [categories, setCategories] = useState([]);
  const [toastError, setToastError] = useState(false);
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  useEffect(() => {
    if (data) {
      console.log(data);
      setCategories(data.productCategories.nodes);
      //setCategories(data2.posts.nodes[0].front_page.telcall);
    }
  }, [data]);

  if (!authToken && typeof window !== "undefined") {
    navigate("/login");
  }


  return (
    <Layout title="Список категорий">
      <Snackbar
        open={toastError}
        autoHideDuration={6000}
        onClose={() => setToastError(false)}
        message={JSON.stringify(error)}

      />

      <Grid container className="bc-wrapper">
        <Grid item xs={12}>
          <Box className="white-box">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"}>Главная</Link>
              <Typography color="text.primary">Категории</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Box className="white-box">
            {error ? <Alert variant="warning">{JSON.stringify(error.message)}</Alert> : null}
            <h1>Категории</h1>
            {
              loading ? (
                <div className={"cats"}>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                  <Typography className={"cats--item"} variant="body1" sx={{ marginBottom: "15px" }}><Skeleton  width={110} /></Typography>
                </div>
              ) : (
                <div className={"cats"}>
                  {
                    categories.map(category => (
                      <Button variant="outlined"
                              key={category.id}
                              component={Link}
                              to={`${category.productCategoryId}`}
                              className={"cats--item"}
                              sx={{marginRight: "20px", marginBottom: "20px", display: "inline-flex"}}
                      >
                        {category.name}
                      </Button>
                    ))
                  }
                </div>
              )
            }
          </Box>
        </Grid>

      </Grid>
    </Layout>
  );
};

export default Index;