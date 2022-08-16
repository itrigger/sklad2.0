import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_POST_BY_ID } from "../../apollo/queries";
import Layout from "../../components/layout";
import { Link } from "gatsby";
import { Box, Breadcrumbs, Grid, Skeleton, Snackbar, Typography } from "@mui/material";
import dateFormat from "dateformat";

const AdvSingle = ({ params }) => {
  const [post, setPost] = useState({});
  const [toastError, setToastError] = useState(false);
  const param = parseInt(params.id);

  const variables = {
    id: param
  };

  const { loading, error, data } = useQuery(GET_POST_BY_ID, {
    variables
  });

  if (error) {
    setToastError(true);
  }

  useEffect(() => {
    if (data) {
      setPost(data.post);
    }
  }, [data]);


  return (
    <Layout title={post.title}>
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
              <Link to={"/obv"}>Объявления</Link>
              <Typography color="text.primary">{post.title}</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        {
          loading ? (
            <Grid item xs={12} md={12}>
              <Box className="white-box">
                <Typography variant="h1"><Skeleton /></Typography>
                <Typography variant="body1"><Skeleton /></Typography>
                <Typography variant="body1"><Skeleton width={210} /></Typography>
                <Typography variant="body1"><Skeleton /></Typography>
                <Typography variant="body1"><Skeleton width={210} /></Typography>
              </Box>
            </Grid>
          ) : (
            <Grid item xs={12} md={12}>
              <Box className="white-box">
                <h1>
                  {post.title}
                </h1>
                <div className="post--date"> {dateFormat(post.date, "dd.mm")}</div>
                <div className="post--content" dangerouslySetInnerHTML={{ __html: post.content }} />
              </Box>
            </Grid>
          )
        }
      </Grid>
    </Layout>
  );
};

export default AdvSingle;