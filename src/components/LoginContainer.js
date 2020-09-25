import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Tabs, Tab, Box } from "@material-ui/core";
import Login from "./Login";
import Register from "./Register";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    width: "50%",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const LoginContainer = () => {
  const [value, setValue] = useState(0);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        className={classes.root}
      >
        <Tab label="Log In" />
        <Tab label="Register" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Login />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Register setValue={setValue} />
      </TabPanel>
    </div>
  );
};

export default LoginContainer;
