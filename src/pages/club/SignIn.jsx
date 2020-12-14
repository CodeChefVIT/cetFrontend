import {
  Button,
  Card,
  CardContent,
  // Dialog,
  // DialogActions,
  // DialogContent,
  Grid,
  Hidden,
  makeStyles,
  TextField,
  Typography,
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
    width: "70%",
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

const ClubSignin = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async () => {
    const url = `${process.env.REACT_APP_BACKEND_URL}/student/login`;
    const data = {
      email,
      password,
    };

    try {
      await Axios.post(url, data).then((res) => {
        console.log(res);
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
        <Hidden mdDown>
          <Grid item xs={6} style={{ textAlign: "center" }}>
            <img
              src='/assets/celebration.png'
              alt='celebration'
              // width="70%"
              height='auto'
            />
          </Grid>
        </Hidden>
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
                      Welcome Back!!
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'>
                      Sign In with your account!
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label='Email *'
                      variant='outlined'
                      type='email'
                      className='form-input'
                      inputRef={register({
                        required: true,
                      })}
                      error={errors.email}
                      helperText={errors.email && "Email is required"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      label='Password *'
                      variant='outlined'
                      type='password'
                      className='form-input'
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
                    />
                  </Grid>
                  <Grid item xs={12}></Grid>

                  <Grid item xs={12}>
                    <p style={{ textAlign: "center" }}>
                      Don't have an account?{" "}
                      <span style={{ color: "#E45044" }}>
                        <Link
                          to='/club/signup'
                          style={{
                            marginRight: "10px",
                          }}>
                          Sign Up
                        </Link>

                        <Link to='/'>Forgot Password</Link>
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
                      Sign In
                    </Button>
                  </Grid>
                </Grid>

                <br />
              </CardContent>
            </Card>
          </form>
        </Grid>
      </Grid>
    </Background>
  );
};

export default ClubSignin;
