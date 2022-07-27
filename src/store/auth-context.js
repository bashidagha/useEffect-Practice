import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin: () => {},
    onLogOut: () => {},
});


export const AuthContextProvider = (props)=>{

    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect(()=>{
        const getUserLoggingInformation = localStorage.getItem('isLoggedIn')
    
        if(getUserLoggingInformation === '1'){
          setIsLoggedIn(true)
        }
    
      },[])
    
    
      const loginHandler = (email, password) => {
        // We should of course check email and password
        // But it's just a dummy/ demo anyways
        localStorage.setItem('isLoggedIn', '1')
        setIsLoggedIn(true);
      };
    
      const logoutHandler = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn')
      };

    return(
    <AuthContext.Provider value={{
        isLoggedIn: isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler
      }}>
        {props.children}
    </AuthContext.Provider>
    )
    
}

export default AuthContext;
