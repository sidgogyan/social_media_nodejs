import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {BrowserRouter as Router,Switch,Route, Redirect} from "react-router-dom"
import { useContext,useEffect } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {

  
  const {user} = useContext(AuthContext)



    

  
  return (
     <Router>
       <Switch>
         <Route path="/"  exact>
           {user?<Home/>:<Redirect to="/login"/>}
         </Route>
         <Route path="/login"  exact>
         {user ?<Redirect to="/"/>:<Login/>}
         </Route>
         <Route path="/register"  exact>
         {user ?<Redirect to="/"/>:<Register/>}
         </Route>
         <Route path="/profile/:username"  >

         {user ?<Profile/>:<Redirect to="/login"/>}
         </Route>
       </Switch>
     </Router>
  );
}

export default App;
