import { createContext, use, useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext(null);

export default function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState(null);
  const [ownerId, setownerId] = useState(null)
  console.log(authToken, "authToken");
  useEffect(() => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      setAuthToken(token);
      const {id} = jwtDecode(token);
      setownerId(id)
      console.log("decoded", id);

    }
  }, []);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken ,ownerId }}>
      {/*this mean that using the context to access the value authtoken and setauthotekn */}
      {children}
    </AuthContext.Provider>
  );
}
