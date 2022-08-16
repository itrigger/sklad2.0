import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { useQuery } from "@apollo/client";
import { GET_ALL_NEWS } from "../../apollo/queries";
import { Link } from "gatsby";
import NewsItem from "../../components/news/NewsItem";
import { Box, Breadcrumbs, Grid, Skeleton, Typography } from "@mui/material";
import { Alert } from '@mui/material'

const Index = () => {
  const [posts, setPosts] = useState();
  const { loading, error, data } = useQuery(GET_ALL_NEWS);

  useEffect(() => {
    if (data) {
      console.log(data);
      setPosts(data.posts.nodes);

    }
  }, [data]);

  return (
    <Layout title="Новости">
      <Grid container className="bc-wrapper">
        <Grid item xs={12}>
          <Box className="white-box">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"}>Главная</Link>
              <Typography color="text.primary">Новости</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>

      <Box className="white-box">
      <Grid container>
        <Grid item xs={12} md={12}>
          {error? <Alert variant="warning">{JSON.stringify(error.message)}</Alert> : null}

            <h1>Новости</h1>
            {
              loading ? (
                  <>
                  <Typography variant="body1"><Skeleton width={110}/></Typography>
                  <Typography variant="body1"><Skeleton /></Typography>
                  <Typography variant="body1" sx={{marginBottom:"25px"}}><Skeleton /></Typography>

                  <Typography variant="body1"><Skeleton width={110}/></Typography>
                  <Typography variant="body1"><Skeleton /></Typography>
                  <Typography variant="body1" sx={{marginBottom:"25px"}}><Skeleton /></Typography>

                  <Typography variant="body1"><Skeleton width={110}/></Typography>
                  <Typography variant="body1"><Skeleton /></Typography>
                  <Typography variant="body1" sx={{marginBottom:"25px"}}><Skeleton /></Typography>
                  </>
              ) : (
                <div className={"posts"}>
                  {
                    posts?.map(post => (
                      <NewsItem
                        key={post.databaseId}
                        id={post.databaseId}
                        title={post.title}
                        date={post.date}
                        image={post.featuredImage !== null ? post.featuredImage.node.sourceUrl : null}
                        text={post.excerpt}
                      />
                    ))
                  }
                </div>
              )
            }


        </Grid>
      </Grid> </Box>

    </Layout>
  );
};

export default Index;