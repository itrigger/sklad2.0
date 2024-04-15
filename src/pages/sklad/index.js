import React, { useEffect, useRef, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_ALL_NEW_ORDERS, GET_ALL_ORDERS, GET_ALL_ORDERS_RANGE } from "../../apollo/queries";
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
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Table,
  TableBody,
  TextField,
  Typography
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dateFormat from "dateformat";
import LoadingButton from "@mui/lab/LoadingButton";
import ReportItem from "../../components/sklad/ReportItem";

const Sklad = () => {

  const [value, setValue] = React.useState(new Date());
  const [value2, setValue2] = React.useState(new Date());
  const [rangeDates, setRangeDates] = useState(false);
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
  };
  const handleChange2 = (newValue) => {
    setValue2(newValue);
  };
  const handleChangeCheckbox = (value) => {
    setRangeDates(value);
  };

  const [getOrder, { loading, error, data }] = useLazyQuery(GET_ALL_ORDERS,
    {
      variables,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only"
    }
  );
  const [getOrderRange, { loading: loading3, error: error3, data: data3 }] = useLazyQuery(GET_ALL_ORDERS_RANGE,
    {
      variables,
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only"
    }
  );
  const [getAllNewOrder, { loading: loading2, error: error2, data: data2 }] = useLazyQuery(GET_ALL_NEW_ORDERS,
    {
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only"
    }
  );

  const submitHandler = () => {
    if (rangeDates) {
      let value3 = new Date(value);
      value3.setDate(value3.getDate() - 1);
      const variables2 = {
        day1: parseInt(dateFormat(value3, "dd")),
        month1: parseInt(dateFormat(value3, "mm")),
        day2: parseInt(dateFormat(value2, "dd")),
        month2: parseInt(dateFormat(value2, "mm"))
      };
      getOrderRange({
        variables: variables2
      }).then((r) => {
      });
    } else {
      getOrder({
        variables
      }).then((r) => {
      });
    }
  };
  const submitHandler2 = () => {
    getAllNewOrder().then((r) => {
    });
  };

  useEffect(() => {
    getAllNewOrder().then((r) => {
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

  useEffect(() => {
    let arr1 = [];
    if (!rangeDates && data2) {
      setOrders(data2.orders.nodes);
      data2.orders.nodes.forEach(i => {
        i.lineItems.nodes.forEach(j => {
          arr1.push(j);
        });
      });
      setArr(arr1);
    }
  }, [data2]);

  useEffect(() => {
    let arr1 = [];
    if (rangeDates && data3) {
      setOrders(data3.orders.nodes);
      data3.orders.nodes.forEach(i => {
        i.lineItems.nodes.forEach(j => {
          arr1.push(j);
        });
      });
      setArr(arr1);
    }
  }, [data3]);

  const handleIsCheckedParent = (checkStatus, id) => {
    let arr1 = [];
    const foundIndex = orders.findIndex(x => x.databaseId === id);
    orders[foundIndex].checked = checkStatus;
    orders.forEach(i => {
      if (i.checked !== false) {
        i.lineItems.nodes.forEach(j => {
          arr1.push(j);
        });
      }
    });
    setArr(arr1);
  };

  const handleIsCheckedReport = (checkStatus, name) => {
    const foundIndex = report.findIndex(x => x.name === name);
    report[foundIndex].checked = checkStatus;
  };



  const makeReport = () => {
    setReport([])
    const result = arr.reduce((acc, cur) => {
      const index = acc.findIndex((item) => item.name === cur.product.node.name);

      if (index === -1) {
        acc.push({
          name: cur.product.node.name,
          quantity: cur.quantity,
          measures: cur.product.node.productsacf.measures,
          checked: true
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
            {error2 ? <Alert>{JSON.stringify(error2.message)}</Alert> : <></>}
            {error3 ? <Alert>{JSON.stringify(error3.message)}</Alert> : <></>}
            <h1>Все заявки</h1>
            <Stack direction="row" spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label={rangeDates ? "Укажите начальную дату" : "Укажите дату"}
                  inputFormat="dd/MM/yyyy"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              {rangeDates && (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Укажите конечную дату"
                    inputFormat="dd/MM/yyyy"
                    value={value2}
                    onChange={handleChange2}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              )}
              <FormControlLabel control={<Checkbox
                checked={rangeDates}
                onChange={(e) => handleChangeCheckbox(e.target.checked)}
              />} label="Несколько дней" />


              <LoadingButton
                variant="contained"
                size="large"
                loading={loading || loading3}
                className="pointer mr2 button"
                onClick={() => submitHandler()}
              >
                Загрузить
              </LoadingButton>
              <Box sx={{ width: "1px", height: "auto", backgroundColor: "#dadada" }}>
              </Box>
              <LoadingButton
                variant="contained"
                size="large"
                loading={loading2}
                className="pointer mr2 button"
                onClick={() => submitHandler2()}
              >
                Загрузить все непросмотренные
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
                      key={order.databaseId}
                      date={order.date}
                      id={order.databaseId}
                      orderStatus={order.status}
                      items={order.lineItems.nodes}
                      customer={order.customer}
                      note={order.customerNote}
                      handleIsCheckedParent={handleIsCheckedParent}
                    />
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
                            <ReportItem
                              key={rep.name}
                              name={rep.name}
                              quantity={rep.quantity}
                              measures={rep.measures}
                              checked={rep.checked}
                              handleIsCheckedReport={handleIsCheckedReport}
                            />
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
                    <Button style={{ marginLeft: "20px" }} variant="contained">Очистить</Button>
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