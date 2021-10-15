import "./App.css";
import { Redirect, Route, Switch } from "react-router";
import Homepage from "./Components/Homepage";
import Populate from "./Components/Populate";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Details from "./Components/Details";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/populate" component={Populate} />
        <Route exact path="/populate/:id" component={Populate} />
        <Route exact path="/item/:id" component={Details} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
