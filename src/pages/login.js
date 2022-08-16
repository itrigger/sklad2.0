import React, { useState } from "react";
import { Link, navigate } from "gatsby";
import { useMutation } from "@apollo/client";
import { GET_TOKEN } from "../apollo/queries";
import { AUTH_TOKEN } from "../constants";
import {
  Box,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput, Paper,
  TextField, Typography
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Alert } from '@mui/material'


const Login = () => {
  const [formState, setFormState] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
    showPassword: false
  });

  const setUser = user =>
    window.localStorage.setItem("siteUser", JSON.stringify(user));

  const handleClickShowPassword = () => {
    setFormState({
      ...formState,
      showPassword: !formState.showPassword
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [login, { data, loading, error }] = useMutation(GET_TOKEN, {
    variables: {
      username: formState.email,
      password: formState.password
    },
    onCompleted: ({ login }) => {
      setUser({
        id: login.user.databaseId,
        username: login.user.username,
        name: login.user.name,
        email: login.user.email,
        wootoken: login.user.wooSessionToken
      });
      localStorage.setItem(AUTH_TOKEN, login.authToken);
      localStorage.setItem("woo-session", login.user.wooSessionToken);
      if(typeof window !== "undefined"){navigate("/");}
    },
    onError(err) {
      console.log(err);
    }

  });

  return (
      <Container maxWidth="xl" className={"auth-container"}>
        <Grid container direction="column" sx={{ minHeight: "100vh" }}>
          <Grid item xs={12}>
            <Grid className={"auth-block"} container justifyContent="center" alignItems="center" sx={{ minHeight: "calc(100vh - 68px)", maxWidth: "420px", margin: "0 auto" }}>
              <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                <Paper elevation={8} sx={{padding: "20px"}}>
                <h1>
                  {formState.login ? "Вход" : "Регистрация"} {loading ? <span className={"spinner"}></span> : ""}
                </h1>
                <div className="flex flex-column">
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "34ch" }
                    }}
                    noValidate
                    autoComplete="on"
                  >
                    {!formState.login && (
                      <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Имя пользователя"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            name: e.target.value
                          })
                        }
                      />
                    )}
                    <TextField
                      fullWidth
                      required
                      id="outlined-required"
                      label="Имя пользователя"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          email: e.target.value
                        })
                      }
                    />

                    <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={formState.showPassword ? "text" : "password"}
                        value={formState.password}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            password: e.target.value
                          })}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {formState.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>

                    <LoadingButton variant="contained" size="large" loading={loading}
                            className="pointer mr2 button"
                            onClick={formState.login ? login : null}
                    >
                      {formState.login ? "Вход" : "Регистрация"}
                    </LoadingButton>
                  </Box>
                </div>

                {error ? (
                <Alert severity="error">
                  {error && error.graphQLErrors ? error.graphQLErrors.map(({ message }, i) => {
                    switch (message) {
                      case "empty_username":
                        return (<span key={i}>Имя пользователя не заполнено</span>);
                      case "empty_password" :
                        return (<span key={i}>Пароль не указан</span>);
                      case "invalid_username" :
                        return (<span key={i}>Пользователь не найден</span>);
                      case "incorrect_password" :
                        return (<span key={i}>Пароль не верный</span>);
                    }
                  }) : ""}
                </Alert>
                  ) : null}

                  <Typography>
                    <Link to={"/"}>Вернуться на главную</Link>
                  </Typography>

                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
  );
};

export default Login;