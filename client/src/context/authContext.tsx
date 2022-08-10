import React, { createContext, useState, useContext, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
   children: React.ReactNode;
}

type Context = {
   isLoading: boolean;
   isLoggedIn: boolean;
   username: string;
};

const AuthContext = createContext<any>({
   isLoggedIn: false,
   isLoading: true,
   username: '',
});
//// const AuthContext = createContext<Context | null | boolean>({
////    isLoading: true,
//// });

//# sends request to server to see if user is still logged in or not, redirects if they are not
const AuthProvider = ({ children }: Props) => {
   const navigate = useNavigate();
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<Context | boolean>(true);
   const [username, setUsername] = useState<string>('');

   useEffect(() => {
      let promise = axios.get('/api/authentication');
      //redirect user to macro calculator page if no daily goals are found
      promise.then((response) => {
         setUsername(response.data);
         setIsLoading(false);
         setIsLoggedIn(true);
         axios
            .get('api/metrics')
            .then((response) => {
               if (response.data.length === 0) {
                  navigate('/macrocalculator');
               }
            })
            .catch((err) => {
               console.log(err);
            });
      });
      promise.catch((err) => {
         setIsLoading(false);
         setIsLoggedIn(false);
         navigate('/', {
            state: { showError: false },
            replace: true,
         });
      });
   }, []);

   //pass down the booleans for isLoading and isLoggedIn
   return (
      <>
         <AuthContext.Provider value={{ isLoading, isLoggedIn, username }}>
            {children}
         </AuthContext.Provider>
      </>
   );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
