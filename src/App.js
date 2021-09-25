import { ButtonGroup, Button } from "@material-ui/core";
import { Switch, Route, Link } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Home from "./Pages/Home";
import "./App.css";
import FormRegistration from "./components/formRegistration";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <ButtonGroup className="btnG">
          <Button>
            <Link to="/">Home</Link>
          </Button>
          <Button>
            <Link to="/registration">Registration</Link>
          </Button>
          <Button>
            <Link to={name === "" ? "/" : `/welcome/${name}`}>Profile</Link>
          </Button>
        </ButtonGroup>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/registration">
            <FormRegistration setName={setName} />
          </Route>
          <Route path="/welcome/:id">
            <Welcome />
          </Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
