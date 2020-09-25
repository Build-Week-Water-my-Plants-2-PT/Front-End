import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
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
    marginBottom: "10px",
    fontSize: "12px",
    backgroundColor: "#669966",
    "&:hover": {
      backgroundColor: "#6b7280",
    },
  },
});

const Register = ({ setValue }) => {
  const classes = useStyles();
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const [credentials, setCredentials] = useState({
    username: "",
    phone_number: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const register = (e) => {
    e.preventDefault();

    axios
      .post(
        "https://water-my-plants-365.herokuapp.com/api/auth/register",
        credentials
      )
      .then((res) => {
        setCredentials({
          username: "",
          phone_number: "",
          password: "",
        });
        setValue(1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1 className={classes.pageName}>Register</h1>
      <div className={classes.root}>
        <Card className={classes.cards} variant="outlined">
          <div className={classes.cardText}>
            <form onSubmit={register} className={classes.root}>
              <TextField
                className={classes.textField}
                id="username"
                label="Username"
                variant="outlined"
                name="username"
                onChange={handleChange}
              />
              <TextField
                className={classes.textField}
                id="phoneNumber"
                label="Phone Number"
                variant="outlined"
                name="phone_number"
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
                Create My Account
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Register;
