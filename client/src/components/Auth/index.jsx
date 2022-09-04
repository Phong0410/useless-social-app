import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";

import { CLIENT_ID } from "../../utils/apis/gapi";

import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = () => {};

  const handleOnChange = () => {};

  const handleShowPassword = () => setShowPassword((prev) => !prev);

  const switchMode = () => {
    setIsRegister((prev) => !prev);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = await res?.profileObj;
    const token = await res?.tokenId;

    try {
      dispatch({
        type: "AUTH",
        data: {
          result,
          token,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">
          {isRegister ? "Register" : "Login"}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isRegister && (
              <>
                <Input
                  name="firstname"
                  label="First name"
                  handleOnChange={handleOnChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastname"
                  label="Last name"
                  handleOnChange={handleOnChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email address"
              handleOnChange={handleOnChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleOnChange={handleOnChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isRegister && (
              <Input
                name="confirmPassword"
                label="Confirm password"
                handleOnChange={handleOnChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isRegister ? "Register" : "Login"}
          </Button>
          <GoogleLogin
            clientId={CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Login with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {isRegister ? "To Login" : "To Register"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
