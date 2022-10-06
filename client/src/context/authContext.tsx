import React, {
   createContext,
   Dispatch,
   SetStateAction,
   useContext,
   useEffect,
   useState,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Props {
   children: React.ReactNode;
}

type Context = {
   isLoading: boolean;
   isLoggedIn: boolean;
   setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
   username: string;
   handleLogout: any;
};

const AuthContext = createContext<any>({
   isLoggedIn: false,
   setIsLoggedIn: null,
   username: '',
   handleLogout: null,
   isLoading: true,
});

//# sends request to server to see if user is still logged in or not, redirects if they are not
const AuthProvider = ({ children }: Props) => {
   const navigate = useNavigate();
   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
   const [isLoading, setIsLoading] = useState<Context | boolean>(true);
   const [username, setUsername] = useState<string>('');

   const handleLogout = async () => {
      try {
         if (isLoggedIn === true) {
            await axios.post('/api/logout');
            navigate('/', { state: { loggedOut: true }, replace: true });
            setIsLoggedIn(false);
         } else {
            navigate('/');
         }
      } catch (err) {
         console.log('err:', err);
      }
   };

   useEffect(() => {
      setIsLoading(true);
      axios
         .get('/api/authentication')
         .then((response) => {
            //redirect user to macro calculator page if no daily goals are found
            if (response.status === 201) {
               setUsername(response.data);
               setIsLoggedIn(true);
               axios
                  .get('/api/metrics')
                  .then((response) => {
                     if (response.data.length === 0) {
                        navigate('/home/macrocalculator');
                     }
                  })
                  .catch((err) => {
                     console.log(err);
                  });
            } else {
               setIsLoggedIn(false);
            }
            setIsLoading(false);
         })
         .catch((err) => {
            setIsLoggedIn(false);
            navigate('/', {
               state: { showError: false },
               replace: true,
            });
            setIsLoading(false);
         });
   }, []);

   //pass down the booleans for isLoading and isLoggedIn
   return (
      <>
         <AuthContext.Provider
            value={{
               isLoading,
               isLoggedIn,
               username,
               handleLogout,
               setIsLoggedIn,
            }}
         >
            {children}
         </AuthContext.Provider>
      </>
   );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
