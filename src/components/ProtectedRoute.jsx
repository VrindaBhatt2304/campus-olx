import { Navigate, Outlet } from "react-router-dom";
import { useContext} from "react";
import UserContext from "../context/UserContext";

export default function ProtectedLayout() {
  const { user, isLoading } = useContext(UserContext);
  if(isLoading)
  {return null;}
  if(!user) 
  {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}
