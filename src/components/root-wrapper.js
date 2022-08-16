import React from "react";
import { ApolloWrapper } from "../apollo/ApolloWrapper";
import { CartProvider } from "../context/CartContext";

const wrapper = ({ element }) => {
  return (

      <ApolloWrapper>
        <CartProvider>{element}</CartProvider>
      </ApolloWrapper>

  );
};

export default wrapper;
