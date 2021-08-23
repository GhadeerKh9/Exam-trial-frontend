import React from "react";
import Header from "./Header";
import IsLoadingAndError from "./IsLoadingAndError";
import Footer from "./Footer";
import Login from "./Login";
import Profile from "./Profile";
import Favourites from "./Favourites";
import Home from "./Home";

import { withAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  render() {
    const { isAuthenticated } = this.props.auth0;
    console.log("app", this.props);
    return (
      <>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}
              {!isAuthenticated && <Login />}
              {isAuthenticated && <Home />}
            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/Favourites">
              {isAuthenticated && <Favourites />}
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
