import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import CurrentUserProfile from "../../components/ChatComponents/CurrentUserProfile";
import { Navigate } from "react-router-dom";

const UserProfile = () => {
  let { user } = useContext(AuthContext);
  return <>{user ? <CurrentUserProfile /> : <Navigate to="/" />}</>;
};

export default UserProfile;
