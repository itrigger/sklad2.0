import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import Layout from "../components/layout";
import { useMutation } from "@apollo/client";
import { CREATE_ORDER } from "../apollo/queries";
import { getUser } from "../services/auth";
import { v4 } from "uuid";
import { Link } from "gatsby";
import {
  Box,
  Breadcrumbs,
  Grid, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { Alert } from '@mui/material'
import Telegram from 'telegram-send-message';
import { CHAT_ID, TELEGRAM_TOKEN } from "../constants";
import dateFormat from "dateformat";

const Cart = () => {
  const [cartItems, setCartItem] = useContext(CartContext);
  const value = React.useContext(CartContext);


  //болванка заказа
  const body = {
    clientMutationId: v4(),
    customerId: getUser().id,
    paymentMethod: "bacs",
    isPaid: false,
    billing: {
      firstName: getUser().name,
      lastName: getUser().lastName
    },
    shipping: {
      firstName: getUser().name,
      lastName: getUser().lastName
    },
    lineItems: []
  };

  //добавляем из локалстороджа товары в болванку
  value[0] && value[0].forEach(item => body.lineItems.push(
    {
      productId: item.databaseId,
      quantity: parseInt(item.quantity),
      name: item.name
    }
  ));

  const variables = {
    input: body
  };


  const [order, { data, loading, error }] = useMutation(CREATE_ORDER, {
    variables: variables,
    onCompleted: ({ order }) => {
      console.warn("success");
      //console.log(order);
    },
    onError(err) {
      console.warn("error");
      console.log(err);
    }
  });

  const curDate = dateFormat(new Date(), "dd.mm HH.MM.ss");
  let msg = `${getUser().name}%0A${curDate}%0A`;
  value[0] && value[0].forEach(item => msg+=`${item.name}: ${item.quantity} ${item.measures}%0A`);

  Telegram.setToken(TELEGRAM_TOKEN);
  Telegram.setRecipient(CHAT_ID);
  Telegram.setMessage(msg);

  const sendOrderHandler = () => {
    order().then(r => {
        if(r.data.createOrder.order.status === 'PENDING'){
          Telegram.send()
          setCartItem([])
        }
      }
    );
  };



  return (
    <Layout title="Заявка">
      <Grid container className="bc-wrapper">
        <Grid item xs={12}>
          <Box className="white-box">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"}>Главная</Link>
              <Typography>Заявка</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Box className="white-box">
          <h1>Заявка</h1>
            {error ? (
              <Alert color="error">{JSON.stringify(error)}</Alert>
            ) : null}
            {data && data.createOrder.order.status === 'PROCESSING' ? (
              <Alert color="success">
                Ваш заказ успешно отправлен!
              </Alert>
            ) : (
                <>
                  { value[0] && value[0].length > 0 ? (
                    <>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            {value[0].map((item) => (
                              <TableRow
                                key={item.id}
                              >
                                <TableCell>{item.name}</TableCell>
                                <TableCell><b>{item.quantity}</b> {item.measures}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <LoadingButton
                        variant="contained"
                        size="large"
                        loading={loading}
                        className="pointer mr2 button"
                        onClick={() => sendOrderHandler()}
                        sx={{marginTop: "25px"}}
                      >
                        Отправить заявку
                      </LoadingButton></>
                  ) : (<Alert color="info">В вашем списке еще ничего нет. Нажмите в главном меню кнопку Заявка, чтобы добавить позиции в заявку</Alert>)}

                  {
                    loading ? (
                      <Alert sx={{marginTop: "20px"}} color="info">Дождитесь окончания отправки</Alert>
                    ) : null
                  }
                </>
            )}
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Cart;