import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { fetchSession } from "../../utils/FetchSession";
import { redirect } from "react-router";

export const UserContext = createContext({
    user: null,
    login: (user) => {},
    logout: () => {},
    updateUser: (newUser) => {},
  });
  
  export const AuthProvider = (props) => {
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      const checkLoginStatus = async () => {
        const session = await fetchSession();
  
        setUser(session || null);
        console.log(session)
      };
      checkLoginStatus();
    }, []);
  
    useEffect(() => {
      if (!user) {
        Cookies.remove("session");
      }
    }, [user]);
  
    const updateUser = (newUser) => {
      setUser(newUser);
    };
  
    const login = (user) => {
      setUser(user);
      Cookies.set("session", user, { expires: 7 });
    };
  
    const logout = () => {
      setUser(null);
  
      Cookies.remove("session");
      redirect('/');
    };
  
    return (
      <UserContext.Provider value={{ user, login, logout, updateUser }}>
        {props.children}
      </UserContext.Provider>
    );
  };