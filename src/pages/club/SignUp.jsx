import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Typography,
  Snackbar,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Axios from "axios";
import Background from "../../hoc/Background/Background";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 140,
  },
  paper: {
    position: "absolute",
    width: "400",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #E45044",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  root: {
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    boxShadow: "4px 4px 50px rgba(0, 0, 0, 0.05)",
    borderRadius: "30px",
    textAlign: "center",
    height: "auto",
    width: "80%",
    margin: "0 auto",
  },
  gridList: {
    width: 800,
    height: 450,
  },
  gridContainer: {
    height: "100%",
  },
  gridContainerBox: {
    width: "100%",
    margin: 0,
    padding: "2rem",
  },
  cardContent: {
    textAlign: "center",
    fontFamily: "Source Sans Pro",
    fontSize: "1rem",
  },
  gridItemContainer: {
    margin: "0 auto",
  },
}));

const SignUp = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const [open, setOpen] = useState(false);
  const [disable, setDisabled] = useState(true);
  const [snackopen, setSOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [type, setType] = useState("");
  const [otp, setOTP] = useState("");

  const handleFormSubmit = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/club/signup`;
    const data = {
      email,
      password,
      name,
      type,
    };

    console.log(data);

    try {
      await Axios.post(url, data).then((res) => {
        console.log(res);
        setOpen(true);
        setTimeout(setDisabled(false), 60000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOTPSubmit = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/club/email/verify`;
    const data = {
      email,
      emailVerificationCode: otp,
    };

    console.log(data);

    try {
      await Axios.post(url, data).then((res) => {
        console.log(res);
        setSOpen(true);
        setOpen(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const resendVerificationEmail = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/club/email/resendOTP`;
    const data = {
      email,
    };

    console.log(data);

    try {
      await Axios.post(url, data).then((res) => {
        console.log(res);
        setDisabled(true);
        setTimeout(setDisabled(false), 60000);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <Grid
        container
        alignItems='center'
        className={classes.gridContainer}
        spacing={0}>
        <Grid item container sm={12} md={6}>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Card className={classes.root}>
              <CardContent className={classes.cardContent}>
                <Grid
                  container
                  spacing={2}
                  className={classes.gridContainerBox}>
                  <Grid item xs={12}>
                    <Typography
                      gutterBottom
                      variant='h4'
                      component='h2'
                      style={{
                        fontFamily: "Source Sans Pro",
                        fontWeight: "600",
                      }}>
                      Welcome
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'>
                      Sign Up for your account!
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='name'
                      label='Name *'
                      variant='outlined'
                      type='text'
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.name}
                      helperText={errors.name && "Name is required"}
                      className='form-input'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='email'
                      label='Email *'
                      variant='outlined'
                      type='email'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      className='form-input'
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.email}
                      helperText={errors.email && "Email is required"}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name='password'
                      label='Password *'
                      variant='outlined'
                      type='password'
                      value={password}
                      onChange={(e) => {
                        setPass(e.target.value);
                      }}
                      inputRef={register({
                        required: true,
                        minLength: 8,
                      })}
                      error={errors.password}
                      helperText={
                        (errors.password?.type === "required" &&
                          "Password is required") ||
                        (errors.password?.type === "minLength" &&
                          "Password should be at least 8 characters long!")
                      }
                      className='form-input'
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      name='rpassword'
                      label='Retype Password *'
                      variant='outlined'
                      type='password'
                      inputRef={register({
                        validate: (value) =>
                          value === password || "The passwords do not match",
                      })}
                      className='form-input'
                      error={errors.rpassword}
                      helperText={
                        errors.rpassword && "The passwords do not match"
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='type'
                      select
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                      }}
                      label='Club Category *'
                      variant='outlined'
                      inputRef={register({
                        required: true,
                      })}
                      className='form-input'>
                      <MenuItem value='Technical'>Technical</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid item xs={12}></Grid>

                  <Grid item xs={12}>
                    <p style={{ textAlign: "center" }}>
                      Already have an account?{" "}
                      <span style={{ color: "#E45044" }}>
                        <Link
                          to='/club/signin'
                          style={{
                            marginRight: "10px",
                          }}>
                          Sign In
                        </Link>
                      </span>
                    </p>
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      type='submit'
                      variant='contained'
                      style={{
                        textTransform: "capitalize",
                        border: "1px solid #E45044",
                        backgroundColor: "#E45044",
                        color: "white",
                        fontFamily: "Source Sans Pro",
                        height: "48px",
                        width: "188px",
                        borderRadius: "10px",
                        fontSize: "18px",
                        fontWeight: "600",
                        lineHeight: "150%",
                        outline: "none",
                      }}>
                      Sign Up
                    </Button>
                  </Grid>
                </Grid>

                <br />
              </CardContent>
            </Card>
          </form>
        </Grid>
        <Dialog
          style={{ fontSize: "1.6rem" }}
          aria-labelledby='form-dialog-title'
          open={open}>
          <DialogContent>
            <p>Enter the OTP you received on your email</p>
            <form autoComplete='off'>
              <TextField
                name='otp'
                value={otp}
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                label='Enter OTP'
                variant='outlined'
                type='otp'
                id='batch-name'
                className='form-input'
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              color='secondary'
              style={{
                float: "left",
                position: "absolute",
                left: 30,
              }}
              disabled={disable}
              onClick={resendVerificationEmail}>
              Resend
            </Button>

            <Button
              color='secondary'
              style={{ outline: "none" }}
              onClick={handleOTPSubmit}>
              Done
            </Button>
          </DialogActions>
        </Dialog>
        <Snackbar
          open={snackopen}
          autoHideDuration={6000}
          onClose={() => {
            setSOpen(false);
          }}>
          Account Sucessfully Created
        </Snackbar>
        <Grid item xs={6} style={{ textAlign: "center" }}>
          <img src='/assets/celebration.png' alt='' height='auto' />
        </Grid>
      </Grid>
    </Background>
  );
};

export default SignUp;
