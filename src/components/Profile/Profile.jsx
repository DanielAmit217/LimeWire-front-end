import { UserContext } from "../../context/UserContext.jsx";
import { useContext } from "react";

function profile() {
  const { user } = useContext(UserContext);

  return <div>{user.username}</div>;
}

export default profile;
