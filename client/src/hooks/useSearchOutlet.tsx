import { useOutletContext } from 'react-router-dom';

interface OutletContext {
   loading: any;
   handleDrawerToggle: any;
   apiData: any;
   route: any;
   handleLoadMore: any;
   setAlertMessage: any;
   setOpenSnackbar: any;
   setAlertSeverity: any;
   showLoadMoreBtn: any;
   SearchFormComponent: any;
   openAlert: any;
   handleAlert: any;
   alertSeverity: any;
   alertMessage: any;
}

export const useSearchOutlet = () => {
   return useOutletContext<OutletContext>();
};
