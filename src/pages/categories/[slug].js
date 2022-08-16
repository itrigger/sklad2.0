import React, { useEffect, useState } from "react";
import Layout from "../../components/layout";
import { AUTH_TOKEN } from "../../constants";
import { Link, navigate } from "gatsby";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_BY_ID, GET_PRODUCTS_BY_CATID } from "../../apollo/queries";
import ProductRow from "./row";
import {
  Box,
  Breadcrumbs,
  Grid, Skeleton,
  Snackbar,
  Table,
  TableBody,
  TableContainer,
  Typography
} from "@mui/material";
import { Alert } from '@mui/material'

const Categories = ({ params }) => {

  const [products, setProducts] = useState([]);
  const [categoryInfo, setCategoryInfo] = useState({});
  const [toastError, setToastError] = useState(false);

  const param = parseInt(params.slug);
  const authToken = typeof window !== "undefined" && localStorage.getItem(AUTH_TOKEN);

  const variables = {
    categoryId: param
  };
  const { loading, error, data } = useQuery(GET_PRODUCTS_BY_CATID, {
    variables
  });

  useEffect(() => {
    if (data) {
      setProducts(data.products.nodes);
    }
  }, [data]);

  const variables2 = {
    id: param
  };

  const { loading: loading2, error: error2, data: data2 } = useQuery(GET_CATEGORY_BY_ID, {
    variables: variables2
  });
  useEffect(() => {
    if (data2) {
      setCategoryInfo(data2.productCategory);
    }
  }, [data2]);

  if (!authToken && typeof window !== "undefined") {
    navigate("/login");
  }


  return (
    <Layout title={categoryInfo.name}>
      <Snackbar
        open={toastError}
        autoHideDuration={6000}
        onClose={() => setToastError(false)}
        message={JSON.stringify(error)}
      />

      <Grid container className="bc-wrapper">
        <Grid item xs={12} md={12}>
          <Box className="white-box">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"}>Главная</Link>
              <Link to={"/categories"}>Категории</Link>
              <Typography color="text.primary">{categoryInfo.name}</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12} md={12}>
          <Box className="white-box">
            {error ? <Alert variant="warning">{JSON.stringify(error.message)}</Alert> : null}
            {error2 ? <Alert variant="warning">{JSON.stringify(error2.message)}</Alert> : null}

            {loading ? (
              <>
                <Typography variant="h1" sx={{marginBottom:"25px"}}><Skeleton /></Typography>
                <Typography variant="body1"><Skeleton /></Typography>
                <Typography variant="body1" sx={{marginBottom:"25px"}}><Skeleton /></Typography>

                <Typography variant="body1"><Skeleton /></Typography>
                <Typography variant="body1" sx={{marginBottom:"25px"}}><Skeleton /></Typography>

                <Typography variant="body1"><Skeleton /></Typography>
                <Typography variant="body1" sx={{marginBottom:"25px"}}><Skeleton /></Typography>
              </>
            ) : (
              <>
                <h1>{categoryInfo.name}</h1>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {
                        products?.map(product => (
                          <ProductRow
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            measures={product.productsacf.measures}
                            packs={product.productsacf.packs}
                            databaseId={product.databaseId}
                          />
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Categories;