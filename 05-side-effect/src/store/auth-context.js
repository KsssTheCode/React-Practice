import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
   isLoggedIn: false,
   onLogout: () => {},
   onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');
      if (storedUserLoggedInInformation) setIsLoggedIn(true);
   }, []);

   const loginHandler = () => {
      localStorage.setItem('isLoggedIn', '0');
      setIsLoggedIn(true);
   };

   const logoutHandler = () => {
      localStorage.removeItem('isLoggedIn');
      setIsLoggedIn(false);
   };

   return (
      <AuthContext.Provider
         value={{
            isLoggedIn: isLoggedIn,
            onLogin: loginHandler,
            onLogout: logoutHandler,
         }}
      >
         {props.children}
      </AuthContext.Provider>
   );
};

export default AuthContext;
