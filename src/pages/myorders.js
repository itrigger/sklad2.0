import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import { AUTH_TOKEN } from "../constants";
import { Link, navigate } from "gatsby";
import { NetworkStatus, useQuery } from "@apollo/client";
import { GET_MY_ORDERS } from "../apollo/queries";
import { getUser } from "../services/auth";
import OrderItem from "../components/order/OrderItem";
import { Box, Breadcrumbs, Grid, Skeleton, Typography } from "@mui/material";
import { Alert } from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached';
import LoadingButton from "@mui/lab/LoadingButton";

const Myorders = () => {

  const [orders, setOrders] = useState([]);
  const variables = {
    customerId: getUser().id
  };
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_MY_ORDERS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (data) {
      setOrders(data.customer.orders.nodes);
    }
  }, [data]);

  const refetchHandler = () => {
    refetch().then( r => {
      console.log(r);
      }
    )
  }

  const authToken = typeof window !== "undefined" && localStorage.getItem(AUTH_TOKEN);

  if (!authToken && typeof window !== "undefined") {
    navigate("/login");
  }

  return (
    <Layout title={"Мои заказы"}>
      <Grid container className="bc-wrapper">
        <Grid item xs={12}>
          <Box className="white-box">
          <Breadcrumbs aria-label="breadcrumb">
            <Link to={"/"}>Главная</Link>
            <Link to={"/profile"}>Мой профиль</Link>
            <Typography color="text.primary">Мои заявки</Typography>
          </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>


      <Grid container>
          <Grid item xs={12}>
            <Box className="white-box">
              <h1>Мои заявки
                <LoadingButton
                  variant="text"
                  loadingPosition="center"
                  size="large"
                  loading={loading}
                  className="pointer mr2 button"
                  onClick={()=>refetchHandler()}
                  sx={{marginLeft:"10px"}}
                >
                  <CachedIcon sx={{marginRight:"7px"}} color="success" /> Обновить
                </LoadingButton>
              </h1>
              {networkStatus === NetworkStatus.refetch ? <Alert color="info">Данные обновляются</Alert> : null}
              {error ? <Alert variant="warning">{JSON.stringify(error.message)}</Alert> : null}
              {
                loading ? (<>
                  <Typography><Skeleton sx={{marginTop:"25px"}}/></Typography>
                  <Typography><Skeleton sx={{marginTop:"25px"}}/></Typography>
                  <Typography><Skeleton sx={{marginTop:"25px"}}/></Typography>
                  <Typography><Skeleton sx={{marginTop:"25px"}}/></Typography>
                </>) : (<>
                  {
                    data && data.customer.orders.nodes ?
                      <div className={"order--items"}>
                        {
                          orders.map(order => (
                              <OrderItem key={order.date} date={order.date} items={order.lineItems.nodes} />
                            )
                          )
                        }
                      </div> : null
                  }
                </>)
              }
            </Box>
          </Grid>
      </Grid>
    </Layout>
  );
};

export default Myorders;