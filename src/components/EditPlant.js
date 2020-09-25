import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  Button,
  TextField,
  MenuItem,
  InputLabel,
  Select,
} from "@material-ui/core";
import { Link, useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../contexts/userContext";
import { axiosWithAuth } from "../utils/axiosWithAuth";

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
    height: "320px",
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

  label: {
    marginTop: "20px",
  },
});

const EditPlant = () => {
  const classes = useStyles();
  const { plantId } = useParams();
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [formInput, setFormInput] = useState({
    type: "",
    nickname: "",
    frequency: "",
  });

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    axiosWithAuth()
      .get(`https://water-my-plants-365.herokuapp.com/api/plants/${plantId}`)
      .then((res) => {
        setFormInput({
          type: res.data.species,
          nickname: res.data.nickname,
          frequency: res.data.H2oFrequency,
        });
      })
      .catch((err) => {
        console.log("err:", err);
      });
  }, [plantId]);

  const upDate = (e) => {
    e.preventDefault();
    const plantInfo = {
      nickname: formInput.nickname,
      species: formInput.type,
      H2oFrequency: formInput.frequency,
      user_id: user.id,
    };

    axiosWithAuth()
      .put(
        `https://water-my-plants-365.herokuapp.com/api/plants/${plantId}`,
        plantInfo
      )
      .then((res) => {
        history.push("/myplants");
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.pageName}>Edit Plant</h1>
      <Card className={classes.cards} variant="outlined">
        <form className={classes.cardText} onSubmit={upDate}>
          <TextField
            className={classes.cardText}
            id="type"
            label="Plant Type"
            variant="outlined"
            name="type"
            onChange={handleChange}
            value={formInput.type}
          />
          <TextField
            className={classes.cardText}
            id="nickname"
            label="Nickname"
            variant="outlined"
            name="nickname"
            onChange={handleChange}
            value={formInput.nickname}
          />

          <InputLabel id="label" className={classes.label}>
            Watering Frequency
          </InputLabel>

          <Select
            labelId="label"
            id="select"
            name="frequency"
            value={formInput.frequency}
            onChange={handleChange}
          >
            <MenuItem value="Everyday">Everyday</MenuItem>
            <MenuItem value="Every 3 days">
              Every 3 days (recommended for most house plants)
            </MenuItem>
            <MenuItem value="Once a week">Once a week</MenuItem>
            <MenuItem value="Once a month">
              Once a month (recommended for cacti)
            </MenuItem>
          </Select>

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

export default EditPlant;
