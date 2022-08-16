import React from "react";
import dateFormat from "dateformat";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const OrderItem = (props) => {

  return (
    <div className={"order--item"}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{dateFormat(props.date, "dd.mm HH.MM.ss")}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Table size="small">
            <TableBody>
              {props.items && props.items.map(
                product => (
                  <TableRow key={product.product.node.name}>
                    <TableCell>{product.product.node.name}</TableCell>
                    <TableCell><b>{product.quantity}</b> {product.product.node.productsacf.measures}</TableCell>
                </TableRow>
                )
                )}
            </TableBody>
          </Table>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OrderItem;