import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import ToDoList from "./components/ToDoList";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/todo">
          <ToDoList />
        </Route>
        {/* <Route path="/coin/:coinId">
          <Coin />
        </Route>
        <Route path="/coin">
          <Coins />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
