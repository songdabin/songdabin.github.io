import { HashRouter, Route, Switch } from "react-router-dom";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";
import ToDoList from "./components/ToDoList";
import Home from "./routes/Home";
import Movie from "./routes/Movie";
import Trello from "./routes/Trello";
import Tv from "./routes/Tv";
import Search from "./routes/Search";

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/movie/search" component={Search} />
        <Route path="/movie/tv" component={Tv} />
        <Route path={["/movie", "/movie/movies/:movieId"]} component={Movie} />
        <Route path="/trello" component={Trello} />
        <Route path="/todo" component={ToDoList} />
        <Route path="/coin/:coinId" component={Coin} />
        <Route path="/coin" component={Coins} />
        <Route path="/" component={Home} />
        {/* <Route path={["/movie", "/movie/movies/:movieId"]}>
          <Movie />
        </Route>
        <Route path="/todo">
          <ToDoList />
        </Route>
        <Route path="/coin/:coinId">
          <Coin />
        </Route>
        <Route path="/coin">
          <Coins />
        </Route>
        <Route path="/">
          <Home />
        </Route> */}
      </Switch>
    </HashRouter>
  );
}
export default Router;
