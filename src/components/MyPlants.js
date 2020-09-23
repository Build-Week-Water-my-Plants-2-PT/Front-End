import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import { Card, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
});

const MyPlants = () => {
  const { user } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    if (user.id) {
      axiosWithAuth()
        .get(
          `https://water-my-plants-365.herokuapp.com/api/users/${user.id}/plants`
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [user.id]);

  const PlantCard = () => {
    return (
      <Card className={classes.cards} variant="outlined">
        <div className={classes.cardText}>
          <h3>Plant Type</h3>
          <span>Nickname: gets from input</span>
          <br></br>
          <span>Watering frequency: gets from input</span>
          <div className={classes.buttonDiv}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              Remove
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.pageName}>My Plants</h1>
      <PlantCard />
      <PlantCard />
      <PlantCard />
    </div>
  );
};

export default MyPlants;
