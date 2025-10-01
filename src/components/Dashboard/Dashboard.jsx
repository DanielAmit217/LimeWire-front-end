import { useEffect, useContext } from "react";
import { useState } from "react";
import { UserContext } from "../../context/UserContext.jsx";
import * as userService from "../../services/userService.js";

const Dashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log(fetchedUsers);
        setUsersData(fetchedUsers);
      } catch (error) {
        console.log(err);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <h1>Welcome, {user.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the users
      </p>
      <ul>
        {usersData.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
