import * as React from "react"
import Header from "./header"
import Footer from "./footer"
import Head from "./head"
// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import "../assets/styles/main.scss";
import { Container } from "@mui/material";

const Layout = (props) => {
  return (
    <>
      <Head {...props} />

      <Container maxWidth="xl">
        <div className="content">
          <Header />
          {props.children}
        </div>
        <Footer />
      </Container>
    </>
  )
}

export default Layout
