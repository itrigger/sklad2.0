import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useQuery } from "@apollo/client";
import { GET_ALL_ADVS } from "../../apollo/queries";
import NewsItem from "../../components/news/NewsItem";
import { Link } from "gatsby";
import { Box, Breadcrumbs, Grid, Skeleton, Typography } from "@mui/material";
import { Alert } from '@mui/material'

const Index = () => {
  const [posts, setPosts] = useState()
  const {  loading, error, data } = useQuery(GET_ALL_ADVS);

  useEffect(() => {
    if (data) {
      console.log(data);
      setPosts(data.posts.nodes)

    }
  }, [data]);

  return (
    <Layout title="Объявления">
      <Grid container className="bc-wrapper">
        <Grid item xs={12}>
          <Box className="white-box">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/"}>Главная</Link>
            <Typography color="text.primary">Объявления</Typography>
          </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
          <Grid item xs={12}>
            <Box className="white-box">
              {error? <Alert variant="warning">{JSON.stringify(error.message)}</Alert> : null}
              <h1>Объявления</h1>
            {
              loading ? (
                <Grid item xs={12} md={12}>
                  <Typography variant="body1"><Skeleton width={110}/></Typography>
                  <Typography variant="body1"><Skeleton /></Typography>
                  <Typography variant="body1" sx={{marginBottom:"25px"}}><Skeleton /></Typography>

                  <Typography variant="body1"><Skeleton width={110}/></Typography>
                  <Typography variant="body1"><Skeleton /></Typography>
                  <Typography variant="body1" sx={{marginBottom:"25px"}}><Skeleton /></Typography>

                  <Typography variant="body1"><Skeleton width={110}/></Typography>
                  <Typography variant="body1"><Skeleton /></Typography>
                  <Typography variant="body1" sx={{marginBottom:"25px"}}><Skeleton /></Typography>
                </Grid>
              ) : (
                <div className={"posts"}>
                  {
                    posts?.map(post => (
                      <NewsItem
                        key={post.databaseId}
                        id={post.databaseId}
                        title={post.title}
                        date={post.date}
                        image={null}
                        text={post.excerpt}
                      />
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