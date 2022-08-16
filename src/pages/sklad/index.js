import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_ORDERS } from "../../apollo/queries";
import { Link } from "gatsby";
import Layout from "../../components/layout";
import OrderItemSklad from "../../components/sklad/OrderItemSklad";
import { getUser } from "../../services/auth";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import {
  Alert,
  Box,
  Breadcrumbs,
  Button,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dateFormat from "dateformat";
import LoadingButton from "@mui/lab/LoadingButton";

const Sklad = () => {

  const [value, setValue] = React.useState(new Date());
  const [orders, setOrders] = useState();
  const [loadingReport, setLoadingReport] = useState(false);
  const [arr, setArr] = useState([]);
  const [report, setReport] = useState([]);


  const variables = {
    day: parseInt(dateFormat(value, "dd")),
    month: parseInt(dateFormat(value, "mm"))
  };

  const componentRef = useRef();

  const handleChange = (newValue) => {
    setValue(newValue);
    console.log(dateFormat(value, "dd"));
    console.log(dateFormat(value, "mm"));
  };


  const [getOrder, { loading, error, data }] = useLazyQuery(GET_ALL_ORDERS,
    {
      variables,
      notifyOnNetworkStatusChange: true
    }
  );

  const submitHandler = () => {
    //target.classList.add("btn-loading");
    getOrder({
      variables
    }).then((r) => {
      //target.classList.remove("btn-loading");

    });
  };

  useEffect(() => {
    getOrder({
      variables
    }).then((r) => {
    });
  }, []);

  useEffect(() => {
    let arr1 = [];
    if (data) {
      setOrders(data.orders.nodes);
      data.orders.nodes.forEach(i => {
        i.lineItems.nodes.forEach(j => {
          arr1.push(j);
        });

      });
      setArr(arr1);
    }
  }, [data]);

  const makeReport = () => {

    const result = arr.reduce((acc, cur) => {
      const index = acc.findIndex((item) => item.name === cur.product.node.name);

      if (index === -1) {
        acc.push({
          name: cur.product.node.name,
          quantity: cur.quantity,
          measures: cur.product.node.productsacf.measures
        });
      } else {
        acc[index].quantity += cur.quantity;
      }

      return acc;
    }, []);

    setReport(result);

  };


  if (getUser().username !== "sklad") {
    return (
      <Layout title="Склад. Список заявок">
        <Grid container className="bc-wrapper">
          <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"}>Главная</Link>
              <Typography color="text.primary">Все заявки</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <h1>У Вас нет доступа к этой странице</h1>
          </Grid>
        </Grid>
      </Layout>
    );
  }

  return (
    <Layout>
      <Grid container className="bc-wrapper">
        <Grid item xs={12}>
          <Box className="white-box">
            <Breadcrumbs aria-label="breadcrumb">
              <Link to={"/"}>Главная</Link>
              <Typography color="text.primary">Все заявки</Typography>
            </Breadcrumbs>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <Box className="white-box">
            {error ? <Alert>{JSON.stringify(error.message)}</Alert> : <></>}
            <h1>Все заявки</h1>
            <Stack direction="row" spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Укажите дату"
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LoadingButton
                variant="contained"
                size="large"
                loading={loading}
                className="pointer mr2 button"
                onClick={() => submitHandler()}
              >
                Загрузить
              </LoadingButton>
            </Stack>

            <div className={"orders-sklad"}>
              <Alert severity="info">
                Укажите дату и нажмите кнопку Загрузить, чтобы получить все заявки за выбранный день
              </Alert>
            </div>

            {orders && orders.length < 1 ? (
              <div className={"orders-sklad"}>
                <Alert severity="warning">
                  За выбранный период заявок нет
                </Alert>
              </div>
            ) : null}
            <div className={"orders-sklad"}>
              {
                orders?.map(order => (
                    <OrderItemSklad
                      key={order.date}
                      date={order.date}
                      id={order.databaseId}
                      orderStatus={order.status}
                      items={order.lineItems.nodes}
                      customer={order.customer} />
                  )
                )
              }
              {orders && orders.length > 0 ? (
                <Stack>
                  <LoadingButton
                    variant="contained"
                    size="large"
                    loading={loadingReport}
                    className="pointer mr2 button"
                    onClick={() => makeReport()}
                  >
                    Сформировать общую заявку
                  </LoadingButton>
                </Stack>
              ) : null}
            </div>

            {
              report && report.length > 0 ? (
                <>
                  <div className="print-aria" ref={componentRef}>
                    <h4>Общая заявка за {dateFormat(value, "dd.mm")}</h4>

                    <Table size="small">
                      <TableBody>
                        {
                          report && report.length > 0 ? report.map(rep => (
                            <TableRow key={rep.name}>
                              <TableCell>
                                <div className="like-checkbox"></div>
                              </TableCell>
                              <TableCell>{rep.name}</TableCell>
                              <TableCell><b>{rep.quantity}</b> {rep.measures}</TableCell>
                              <TableCell></TableCell>
                            </TableRow>
                          )) : null
                        }

                      </TableBody>
                    </Table>
                  </div>
                  <div className="print-btn-w">
                    <ReactToPrint
                      trigger={() => <Button variant="contained">
                        <PrintIcon /> &nbsp; Распечатать</Button>}
                      content={() => componentRef.current}
                    />
                  </div>
                </>
              ) : null
            }
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Sklad;