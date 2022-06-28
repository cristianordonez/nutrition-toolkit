import { useEffect, useState } from 'react';
import axios from 'axios';

//hook to check if user is logged in using sessions so that they can be redirected
// to search page or home page if needed
const useAuth = async (username: string, password: string, email: string) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   useEffect(() => {
      let promise = axios.post('api/login', { username, password, email });
      promise.then((response) => {
         console.log('response:', response);
      });
   }, [username, password, email]);
   return [isLoggedIn, setIsLoggedIn];
};

export default useAuth;
