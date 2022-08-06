import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface Props {
   openAlert: boolean;
   handleAlert: (event: React.SyntheticEvent | Event) => void;
   alertSeverity: AlertColor | undefined;
   alertMessage: string;
}

export const CustomAlert = ({
   openAlert,
   handleAlert,
   alertSeverity,
   alertMessage,
}: Props) => {
   return (
      <Snackbar
         anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
         open={openAlert}
         autoHideDuration={8000}
         onClose={handleAlert}
      >
         <Alert
            onClose={handleAlert}
            severity={alertSeverity}
            sx={{ width: '100%' }}
         >
            {alertMessage}
         </Alert>
      </Snackbar>
   );
};
