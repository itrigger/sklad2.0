import fetch from "isomorphic-fetch";
import { ApolloClient, ApolloLink, createHttpLink, InMemoryCache } from "@apollo/client";
import { isEmpty } from "lodash";


export const middleware = new ApolloLink((operation, forward) => {

  let headersData = null;

  const session = typeof window !== "undefined" && localStorage.getItem("woo-session") !== null
    ? localStorage.getItem("woo-session") : null;


  if (!isEmpty(session)) {
    headersData = {
      ...headersData,
      "woocommerce-session": `Session ${session}`
    };
  }


  const token = typeof window !== "undefined" && localStorage.getItem("auth-token") !== null
    ? localStorage.getItem("auth-token") : null;

  if (!isEmpty(token)) {
    headersData = {
      ...headersData,
      "authorization": token ? `Bearer ${token}` : ""
    };
  }

  if (!isEmpty(headersData)) {
    operation.setContext(({ headers = {} }) => ({
      headers: headersData
    }));
  }

  return forward(operation);

});


export const afterware = new ApolloLink((operation, forward) => {

  return forward(operation).map(response => {

    const context = operation.getContext();
    const { response: { headers } } = context;
    const sessionUp = headers.get("woocommerce-session");
    const JWTRefresh = headers.get("x-jwt-refresh");

    if(JWTRefresh){
      if (localStorage.getItem("auth-token") !== JWTRefresh) {
        localStorage.setItem("auth-token", headers.get("x-jwt-refresh"));
      }
    }

    if (sessionUp) {
      // Remove session data if session destroyed.
      if ("false" === sessionUp) {
        localStorage.removeItem("woo-session");
        // Update session new data if changed.
      } else if (localStorage.getItem("woo-session") !== sessionUp) {
        localStorage.setItem("woo-session", headers.get("woocommerce-session"));
      }
    }

    return response;

  });
});


export const client = new ApolloClient({
  link: middleware.concat(afterware.concat(createHttpLink({
    uri: "https://api.sushihiro.org/graphql",
    fetch: fetch
  }))),
  cache: new InMemoryCache()
});

