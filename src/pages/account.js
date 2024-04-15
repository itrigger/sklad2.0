import React, {useState} from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/layout";
import {  useMutation } from "@apollo/client";
import { GET_TOKEN } from "../apollo/queries";
import { Grid } from "@mui/material";

const Account = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  const [login, { loading, error, data }] = useMutation(GET_TOKEN);

  const clickHandler = () =>{
    login( {
      variables: { username: username, password: password },
    })
  }

  if(loading){

  }

  if(data && data.login.authToken){
  }

  if(error){
    console.log(error);
  }

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          Мой аккаунт
        </title>
        <link rel="canonical" href="https://in.sushihiro.org" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#F5DF4D" />
        <meta name="msapplication-TileColor" content="#F5DF4D" />
        <meta name="theme-color" content="#F5DF4D" />
      </Helmet>
      <Layout>
        <Grid container>

            <Grid xs={12}>
              <h1>Account page</h1>

              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  placeholder={"login"}
                />
              </div>
              <div>
                <input
                  type="text"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  placeholder={"password"}
                />
              </div>
              <div>
                <button onClick={()=>clickHandler()}>Send</button>
              </div>

              <div>
                {data && <h4>done!</h4>}
              </div>
            </Grid>

        </Grid>
      </Layout>
    </>
  );
};

export default Account;