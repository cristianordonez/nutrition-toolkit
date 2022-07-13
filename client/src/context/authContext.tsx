import React, {
   createContext,
   Dispatch,
   SetStateAction,
   useState,
   useContext,
   useEffect,
} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';

interface Props {
   children: React.ReactNode;
};

type Context = {
   isLoading: boolean;
};

const AuthContext = createContext<Context | null | boolean>({
   isLoading: true,
});

//# sends request to server to see if user is still logged in or not, redirects if they are not
//if they are, send another request to get data for current user
export const AuthProvider = ({ children }: Props) => {
   const navigate = useNavigate();

   const [isLoading, setIsLoading] = useState<Context | boolean>(true);

   useEffect(() => {
      let promise = axios.get('/api/authentication');
      promise.then((response) => {
         console.log('response in authcontext :', response)
         setIsLoading(false);
      });
      promise.catch((err) => {
         setIsLoading(false);
         navigate('/', {
            state: { showError: true },
            replace: true,
         });
      });
   }, []);

   return (
      <AuthContext.Provider value={isLoading}>{children}</AuthContext.Provider>
   );
};

export const useAuth = () => useContext(AuthContext);
