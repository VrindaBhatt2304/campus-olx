import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import UserContext from "../context/UserContext";

export default function AuthRoute() {
  const {user, isLoading} = useContext(UserContext);
  if(isLoading)
  {return null;}

  if(user)
  {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
