import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import { makeStyles } from "@material-ui/core/styles";
import { Card, Button, TextField } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },

  pageName: {
    marginLeft: "25%",
    color: "#6b7280",
  },

  cards: {
    width: "50%",
    display: "flex",
    marginLeft: "25%",
    flexDirection: "column",
    marginBottom: "20px",
  },
  textField: {
    marginBottom: "10px",
  },

  cardText: {
    margin: "20px",
    display: "flex",
    flexDirection: "column",
  },

  buttonDiv: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },

  button: {
    marginTop: "5%",
    marginBottom: "20px",
    fontSize: "12px",
    backgroundColor: "#669966",
    "&:hover": {
      backgroundColor: "#6b7280",
    },
  },
});

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { setUser, setLoggedIn, setCookie } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const login = (e) => {
    e.preventDefault();
    console.log(credentials);
    axios
      .post(
        "https://water-my-plants-365.herokuapp.com/api/auth/login",
        credentials,
        { withCredentials: true }
      )
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setCookie("token", res.data.token, { path: "/" });
        setUser({
          id: res.data.user.id,
          username: res.data.user.username,
          phoneNumber: res.data.user.phone_number,
        });
        setLoggedIn(true);
        history.push("/myplants");
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h1 className={classes.pageName}>Log In</h1>
      <div className={classes.root}>
        <Card className={classes.cards} variant="outlined">
          <div className={classes.cardText}>
            <form onSubmit={login} className={classes.root}>
              <TextField
                className={classes.textField}
                id="username"
                label="Username"
                variant="outlined"
                name="username"
                onChange={handleChange}
              />
              <TextField
                id="password"
                label="Password"
                variant="outlined"
                name="password"
                type="password"
                onChange={handleChange}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className={classes.button}
              >
                Log In
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
