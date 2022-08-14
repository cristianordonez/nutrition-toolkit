import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Typography } from '@mui/material';

function useQuery() {
   return new URLSearchParams(window.location.search);
}

const ResetPasswordPage = () => {
   //    const { token } = useParams();
   //    let query = useQuery();
   let token = useQuery().get('token');
   let id = useQuery().get('id');

   console.log('id: ', id);
   console.log('token: ', token);
   //todo now need to create form for user to enter new password,
   //todo then make a axios post request with the user id, token, and new password in the new body
   return (
      <>
         <Typography>this is reset password page</Typography>
      </>
   );
};

export default ResetPasswordPage;
