import {
  Switch,
  Route,
  // Redirect,
  // useLocation
} from "react-router-dom";
import { Margin, Login, Signup, } from 'Pages';
import { NotFound, } from 'Pages';
// import PrivateRoute from './PrivateRoute';
// import { useSelector } from 'react-redux';


const AppRouter = () => {
  // const user = JSON.parse(window.localStorage.getItem("squser"))
  // const auth = useSelector((state) => state.auth);
  // const location = useLocation();
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/">
        <Margin />
      </Route>
      {/* {user && user?.noofusernow > 0 && user?.subscriptionPlanId === null ? <Redirect from={location.pathname} exact to={`/pricing`} /> : null} */}
      <Route exact path="*">
        <NotFound />
      </Route>
    </Switch>

  )
}

export default AppRouter
