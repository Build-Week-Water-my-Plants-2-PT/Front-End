import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useCookies } from "react-cookie";
import PrivateRoute from "./components/PrivateRoute";
import { UserContext } from "./contexts/userContext";
import LoginContainer from "./components/LoginContainer";
import Navigation from "./components/Navigation";
import MyPlants from "./components/MyPlants";
import AddPlant from "./components/AddPlant";
import MyAccount from "./components/MyAccount";
import EditPlant from "./components/EditPlant";

function App() {
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/login">
            <LoginContainer />
          </Route>
          <PrivateRoute path="/myplants/edit/:plantId" component={EditPlant} />
          <PrivateRoute path="/myplants" component={MyPlants} />
          <PrivateRoute path="/addplant" component={AddPlant} />
          <PrivateRoute path="/myaccount" component={MyAccount} />
          <Route
            exact
            path="/"
            component={() => {
              window.location.href =
                "https://test1-drab.vercel.app/landing_page.html";
              return null;
            }}
          />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
