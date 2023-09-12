import { Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { Dashboard } from "./dashboad";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LoginPage} />
      <Route path="/nova-sessao" component={LoginPage} />

      <Route path="/" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
