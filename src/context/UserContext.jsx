import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/userService.js";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUserFromToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const userToken = JSON.parse(atob(token.split(".")[1])).payload;
        const user = await getUser(userToken._id); // TODO: Fetch the user using getUser(user._id)
        setUser(user);
      }
    };
    getUserFromToken();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
