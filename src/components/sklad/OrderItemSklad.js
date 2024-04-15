import React, { useRef, useState } from "react";
import dateFormat from "dateformat";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  Chip,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useMutation } from "@apollo/client";
import { UPDATE_ORDER_STATUS } from "../../apollo/queries";
import ReactToPrint from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import { CSVLink } from "react-csv";
import DownloadIcon from "@mui/icons-material/Download";

const OrderItemSklad = (props) => {
  const [status, setStatus] = useState(props.orderStatus === "PENDING" ? "success" : "primary");
  const [isChecked, setIsChecked] = useState(true);

  const componentRef = useRef();

  const [changeStatus, { data, loading, error }] = useMutation(UPDATE_ORDER_STATUS, {
    variables: {
      "input": { "orderId": props.id, "status": "COMPLETED" }
    },
    onCompleted: (r) => {
      console.log(r);
      if (r.updateOrder.order.status === "COMPLETED") {
        setStatus("primary");
      }
    },
    onError(err) {
      console.log(err);
    }

  });
  const statusHandler = (st) => {
    if (st === true) {
      if (status === "success") {
        setStatus("warning");
        changeStatus({
          variables: {
            "input": { "orderId": props.id, "status": "COMPLETED" }
          }
        });
      }
    }
  };

  const pageStyle = `
  @media print {
    .print-table td {
      padding: 5px !important;
    }
  }
`;
  const csvData = [];

  props.items && props.items.forEach(
    (item) => {
      csvData.push([item.product.node.databaseId, item.product.node.name, item.quantity]);
    }
  );

  const handleIsChecked = (e, id) => {
    setIsChecked(e);
    props.handleIsCheckedParent(e, id);
  };

  return (
    <div className={"order--item--sklad"}>
      <Stack direction="row" className="align-items-start mb-2">
        <Checkbox
          checked={isChecked}
          onChange={(e) => handleIsChecked(e.target.checked, props.id)}
        />
        <Accordion className="w-100" onChange={(e, st) => statusHandler(st)}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ display: "flex", width: "100%" }}>{dateFormat(props.date, "dd.mm HH.MM.ss")} {
              props.customer.firstName
            } - {
              props.customer.lastName
            }
              {/* */}
            </Typography>
            <Chip
              label={status === "success" ? "Новая" : status === "warning" ? "Смена статуса" : "Просмотрено"}
              color={status}
              variant={status === "primary" ? "outlined" : "filled"}
            >
            </Chip>
          </AccordionSummary>
          <AccordionDetails>
            <div ref={componentRef}>
              <Table size="small" className="print-table">
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={3}>
                      {dateFormat(props.date, "dd.mm HH.MM.ss")} {props.customer.firstName} - {props.customer.lastName}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="zebra">
                  {props.items && props.items.map(
                    product => (
                      <TableRow key={product.product.node.name}>
                        <TableCell>
                          {product.product.node.name}
                        </TableCell>
                        <TableCell>
                          <b>{product.quantity}</b> {product.product.node.productsacf.measures}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={2}>
                      {props.note && props.note}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>

            <ReactToPrint
              pageStyle={pageStyle}
              trigger={() => <Button variant="contained" sx={{ marginTop: "25px" }}>
                <PrintIcon /> &nbsp; Распечатать</Button>}
              content={() => componentRef.current}
            />
            <CSVLink data={csvData}>
              <Button variant="contained" sx={{ marginTop: "25px", marginLeft: "25px" }}>
                <DownloadIcon /> &nbsp; Выгрузить
              </Button>
            </CSVLink>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </div>
  );
};

export default OrderItemSklad;