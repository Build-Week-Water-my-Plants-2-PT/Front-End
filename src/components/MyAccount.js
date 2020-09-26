import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Card, Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { SettingsRemote } from "@material-ui/icons";

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
    height: "350px",
    display: "flex",
    marginLeft: "25%",
    flexDirection: "column",
    marginBottom: "20px",
    backgroundColor: "#edf5ea",
  },

  cardText: {
    margin: "20px 3% 10px 5%",
    display: "flex",
    flexDirection: "column",
    fontSize: "20px",
  },

  buttonDiv: {
    display: "flex",
    justifyContent: "flex-end",
    width: "100%",
  },

  button: {
    marginTop: "5%",
    marginLeft: "75%",
    fontSize: "12px",
    width: "50px",
    height: "25px",
    backgroundColor: "#669966",
    "&:hover": {
      backgroundColor: "#6b7280",
    },
  },
});

const MyAccount = () => {
  const classes = useStyles();
  const { user, setUser } = useContext(UserContext);

  const [formInput, setFormInput] = useState({
    username: user.username,
    phoneNumber: user.phoneNumber,
    password: "****",
  });

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const upDate = (e) => {
    e.preventDefault();
    const userData = {
      username: user.username,
      password: formInput.password,
      phone_number: formInput.phoneNumber,
    };

    axiosWithAuth()
      .put(
        `https://water-my-plants-365.herokuapp.com/users/${user.id}`,
        userData
      )
      .then((res) => {
        setUser({
          id: res.data.id,
          username: res.data.username,
          phoneNumber: res.data.phone_number,
        });
        console.log("res:", res);
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.pageName}>My Account</h1>
      <Card className={classes.cards} variant="outlined">
        <form className={classes.cardText} onSubmit={upDate}>
          <TextField
            className={classes.cardText}
            id="username"
            label="Username"
            variant="outlined"
            name="username"
            onChange={handleChange}
            disabled={true}
            value={formInput.username}
          />
          <TextField
            className={classes.cardText}
            id="phoneNumber"
            label="Phone Number"
            variant="outlined"
            name="phoneNumber"
            onChange={handleChange}
            value={formInput.phoneNumber}
          />

          <TextField
            className={classes.cardText}
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            onChange={handleChange}
            value={formInput.password}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Save
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default MyAccount;
