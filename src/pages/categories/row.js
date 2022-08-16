import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/CartContext";
import { Box, Button, FormControl, InputAdornment, Stack, TableCell, TableRow } from "@mui/material";
import Input from "@mui/material/Input";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const ProductRow = (props) => {

  const [cartItems, setCartItems] = useContext(CartContext);
  const [val, setVal] = useState(cartItems !== undefined && cartItems.find((x) => x.id === props.id)
    ? cartItems.find((x) => x.id === props.id).quantity
    : 0);



  const addToCart = (quantity) => {
    setVal(quantity)
    if (quantity !== null && quantity > 0) {
      const exist = cartItems.find((x) => x.id === props.id);
      if (exist) {
        setCartItems(
          cartItems.map((x) =>
            x.id === props.id ? { ...exist, quantity: quantity } : x
          )
        );
      } else {
        setCartItems([...cartItems, { ...props, quantity: quantity }]);
      }
    } else {
      const exist = cartItems.find((x) => x.id === props.id);
      if (exist) {
        setCartItems(cartItems.filter((x) => x.id !== props.id));
      }
    }
    console.warn("arg2", quantity);
    console.warn("curval in state", val);
  };

  useEffect(()=>{
    console.error(val);
  },[val])

  const plusHandler = () => {
    const step = parseInt(props.packs);
    const curVal = (val < 1 ? 0 : val);
    addToCart(parseInt(curVal) + step);
  };

  const minusHandler = () => {
    const step = parseInt(props.packs);
    val < step ? addToCart(0) : addToCart(parseInt(val) - step);
  };


  return (
    <TableRow
      className={
        cartItems !== undefined && cartItems.find((x) => x.id === props.id)
          ? "table-tr product-table-tr active"
          : "table-tr product-table-tr"
      }>
      <TableCell>{props.name}</TableCell>
      <TableCell sx={{ width: "120px" }} className="product-row--td-last">
        <Box
          component="form">
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: "240px", marginTop: "0" }} className="product-row--form">
            <Stack direction="row" className="product-row--input-w">
              <Button className="product-row--input-w--button" onClick={() => minusHandler()}>
                <RemoveCircleIcon />
              </Button>
              <Input
                id="standard-adornment-weight"
                value={val}
                onChange={(e) => addToCart(e.target.value)}
                endAdornment={<InputAdornment position="end">{props.measures}</InputAdornment>}
                aria-describedby="standard-weight-helper-text"
                inputProps={{
                  "aria-label": "Кол-во"
                }}
              />
              <Button className="product-row--input-w--button" onClick={() => plusHandler()}>
                <AddCircleIcon />
              </Button>
            </Stack>
          </FormControl>
        </Box>
      </TableCell>

    </TableRow>
  )
    ;
};

export default ProductRow;