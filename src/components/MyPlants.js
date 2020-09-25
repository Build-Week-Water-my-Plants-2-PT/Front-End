import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";
import { Card, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import axios from "axios";

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
    height: "215px",
    display: "flex",
    marginLeft: "25%",
    flexDirection: "column",
    marginBottom: "20px",
    backgroundColor: "#edf5ea",
  },

  cardText: {
    margin: "20px 3% 10px 10%",
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
    marginLeft: "3%",
    fontSize: "12px",
    width: "50px",
    height: "25px",
    backgroundColor: "#669966",
    "&:hover": {
      backgroundColor: "#6b7280",
    },
  },

  link: {
    textDecoration: "none",
    marginTop: "4.5%",
  },
});

const MyPlants = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();
  const [plants, setPlants] = useState([
    {
      id: 1,
      nickname: "American sheepbush",
      species: "Pentzia incana",
      H2oFrequency: "8 days",
      user_id: 1,
    },
    {
      id: 2,
      nickname: "tree",
      species: "tree",
      H2oFrequency: "Every 3 days",
      user_id: 1,
    },
    {
      id: 3,
      nickname: "Ferny",
      species: "fern",
      H2oFrequency: "Everyday",
      user_id: 1,
    },
  ]);

  useEffect(() => {
    if (user.id) {
      axios
        .get(
          `https://water-my-plants-365.herokuapp.com/api/plants/users/${user.id}/plants`,
          { withCredentials: true }
        )
        .then((res) => {
          setPlants(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user.id]);

  const handleRemoveClick = (e) => {
    axiosWithAuth()
      .delete(
        `https://water-my-plants-365.herokuapp.com/api/plants/${e.currentTarget.id}`
      )
      .then((res) => {
        console.log(res.data);
        console.log("This is the id: " + e.currentTarget.id);
        console.log(plants);
        setPlants(
          plants.filter((plant) => plant.id !== parseInt(e.currentTarget.id))
        );
      })
      .catch((err) => console.error(err));
  };

  console.log(plants);

  return (
    <div className={classes.root}>
      <h1 className={classes.pageName}>My Plants</h1>
      {plants.map((el) => {
        return (
          <Card className={classes.cards} key={el.id} variant="outlined">
            <div className={classes.cardText}>
              <h3>{el.species}</h3>
              <span>Nickname: {el.nickname}</span>
              <br></br>
              <span>Watering frequency: {el.H2oFrequency}</span>
              <div className={classes.buttonDiv}>
                <Link to={`/myplants/edit/${el.id}`} className={classes.link}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="primary"
                  id={el.id}
                  name={el.id}
                  onClick={handleRemoveClick}
                  className={classes.button}
                >
                  Remove
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
      ;
    </div>
  );
};

export default MyPlants;
