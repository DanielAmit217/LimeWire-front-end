import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { deleteUser, getUser } from "../../services/userService";
import { useNavigate, useParams } from "react-router";

function UserProfile() {
  const [currentUser, setCurrentUser] = useState({});

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response = await getUser(userId);
      setCurrentUser(response);
      console.log(response);
    };
    fetch();
  }, []);

  const { user, setUser } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    deleteUser(user._id);
    setUser(null);
    navigate("/");
    console.log("Here we are", currentUser);
  };

  return (
    <>
      <h1>{currentUser.username}</h1>
      {currentUser._id === user._id && (
        <form action="" onSubmit={handleSubmit}>
          <button type="submit">Delete</button>
        </form>
      )}
    </>
  );
}

export default UserProfile;
