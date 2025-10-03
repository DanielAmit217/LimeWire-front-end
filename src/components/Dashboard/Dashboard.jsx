import { useEffect, useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import * as userService from "../../services/userService.js";
import SoundList from "../SoundList/SoundList.jsx";
import { Link } from "react-router";

const Dashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsersData(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  return (
    <>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the users
      </p>
      <ul>
        {usersData.map((user) => (
          <li key={user._id}>
            <Link to={`/users/${user._id}`}>{user.username}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dashboard;
