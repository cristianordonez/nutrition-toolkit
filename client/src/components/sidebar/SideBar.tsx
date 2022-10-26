//shared sidebar
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {
   AlertColor,
   Drawer,
   IconButton,
   Stack,
   Toolbar,
   Typography,
} from '@mui/material';
import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react';
import { useLocation } from 'react-router-dom';
import {
   CurrentGoals,
   FoodSearchResult,
   NutritionSummaryFoodLog,
   Query,
} from '../../../../types/types';
import { SearchForm } from '../../pages/home/search-page/search-form';
import { DailyGoalsFoodLog } from '../daily-goals/daily-goals-foodlog/DailyGoalsFoodLog';
import { DailyGoals } from '../daily-goals/daily-goals-main/DailyGoalsMain';
import { MainTitleLogo } from '../main-title-logo/index';
interface Props {
   mobileOpen: boolean | undefined;
   handleDrawerToggle: MouseEventHandler;
   searchResults?: FoodSearchResult[];
   goals: CurrentGoals;
   nutritionSummary: NutritionSummaryFoodLog;
   isSearching: boolean;
   handleSubmit: (event: React.SyntheticEvent) => Promise<void>;
   values: Query;
   setValues: Dispatch<SetStateAction<Query>>;
   setAlertMessage: Dispatch<SetStateAction<string>>;
   setIsSearching: Dispatch<SetStateAction<boolean>>;
   setAlertSeverity: Dispatch<SetStateAction<AlertColor>>;
   setOpenAlert: Dispatch<SetStateAction<boolean>>;
   setShowLoadMoreBtn: Dispatch<SetStateAction<boolean>>;
   setSearchResults: Dispatch<SetStateAction<FoodSearchResult[]>>;
   setSendAdvancedRequest: Dispatch<SetStateAction<boolean>>;
}

const drawerWidth = 350;

export const SideBar = ({
   mobileOpen,
   handleDrawerToggle,
   searchResults,
   goals,
   isSearching,
   nutritionSummary,
   handleSubmit,
   values,
   setValues,
   setAlertMessage,
   setAlertSeverity,
   setIsSearching,
   setOpenAlert,
   setShowLoadMoreBtn,
   setSearchResults,
   setSendAdvancedRequest,
}: Props) => {
   const location = useLocation();

   let page;
   if (location.pathname === '/home') {
      page = 'foodlog';
   } else if (location.pathname === '/home/search') {
      page = 'search';
   } else {
      page = 'other';
   }

   return (
      <>
         {/* MOBILE */}
         <>
            <Drawer
               variant='temporary'
               open={mobileOpen}
               onClose={handleDrawerToggle}
               ModalProps={{
                  keepMounted: true,
               }}
               sx={{
                  display: { xs: 'block', sm: 'none' },
                  '& .MuiDrawer-paper': {
                     boxSizing: 'border-box',
                     width: drawerWidth,
                     pt: '1rem',
                     pb: '1rem',
                  },
               }}
            >
               <Toolbar>
                  <IconButton
                     color='inherit'
                     aria-label='open drawer'
                     edge='start'
                     onClick={handleDrawerToggle}
                     sx={{ mr: 2, display: { sm: 'none' } }}
                  >
                     <ArrowBackIosIcon />
                  </IconButton>
               </Toolbar>
               <Stack
                  sx={{ width: '100%', pb: '3rem' }}
                  direction='row'
                  spacing={2}
                  justifyContent={'center'}
                  alignItems='center'
               >
                  <MainTitleLogo />
               </Stack>
               {/* RENDER SEARCH FORM WHEN THERE ARE FOOD ITEMS IN STATE */}
               {page === 'search' &&
               searchResults !== undefined &&
               searchResults.length > 0 ? (
                  <SearchForm
                     handleSubmit={handleSubmit}
                     values={values}
                     setValues={setValues}
                     goals={goals}
                     setAlertMessage={setAlertMessage}
                     setAlertSeverity={setAlertSeverity}
                     setIsSearching={setIsSearching}
                     setOpenAlert={setOpenAlert}
                     setShowLoadMoreBtn={setShowLoadMoreBtn}
                     setSearchResults={setSearchResults}
                     setSendAdvancedRequest={setSendAdvancedRequest}
                  />
               ) : null}{' '}
               {/* RENDER GOALS WHEN THERE ARE NO SEARCH RESULTS, AND PAGE IS NOT FoodLog */}
               {page !== 'foodlog' &&
               searchResults != undefined &&
               searchResults.length === 0 ? (
                  <DailyGoals goals={goals} />
               ) : null}
               {/* RENDER GOALSFoodLog WHEN PAGE IS FoodLog AND THERE IS NUTRITION SUMMARY */}
               {page === 'foodlog' && nutritionSummary !== undefined ? (
                  <DailyGoalsFoodLog
                     goals={goals}
                     nutritionSummary={nutritionSummary}
                  />
               ) : null}
               {page === 'other' &&
               searchResults != undefined &&
               searchResults.length > 0 ? (
                  <DailyGoals goals={goals} />
               ) : null}
               {isSearching ? (
                  <Typography align='center' variant='h6' sx={{ pt: '1rem' }}>
                     Searching...
                  </Typography>
               ) : null}
            </Drawer>
            {/* DESKTOP */}
            <Drawer
               open
               variant='permanent'
               ModalProps={{ keepMounted: true }}
               sx={{
                  display: { xs: 'none', sm: 'block' },
                  '& .MuiDrawer-paper': {
                     boxSizing: 'border-box',
                     width: drawerWidth,
                     pt: '1rem',
                  },
               }}
            >
               <Stack
                  sx={{ width: '100%', pb: '3rem' }}
                  direction='row'
                  spacing={2}
                  justifyContent={'center'}
                  alignItems='center'
               >
                  <MainTitleLogo />
               </Stack>
               {/* RENDER SEARCH FORM WHEN THERE ARE FOOD ITEMS IN STATE */}
               {page === 'search' &&
               searchResults !== undefined &&
               searchResults.length > 0 ? (
                  <SearchForm
                     handleSubmit={handleSubmit}
                     values={values}
                     setValues={setValues}
                     goals={goals}
                     setAlertMessage={setAlertMessage}
                     setAlertSeverity={setAlertSeverity}
                     setIsSearching={setIsSearching}
                     setOpenAlert={setOpenAlert}
                     setShowLoadMoreBtn={setShowLoadMoreBtn}
                     setSearchResults={setSearchResults}
                     setSendAdvancedRequest={setSendAdvancedRequest}
                  />
               ) : null}{' '}
               {/* RENDER GOALS WHEN THERE ARE NO SEARCH RESULTS, AND PAGE IS NOT FoodLog */}
               {page !== 'foodlog' &&
               searchResults != undefined &&
               searchResults.length === 0 ? (
                  <DailyGoals goals={goals} />
               ) : null}
               {page === 'other' &&
               searchResults != undefined &&
               searchResults.length > 0 ? (
                  <DailyGoals goals={goals} />
               ) : null}
               {/* RENDER GOALS WHEN PAGE IS FoodLog AND THERE IS NUTRITION SUMMARY */}
               {page === 'foodlog' && nutritionSummary !== undefined ? (
                  <DailyGoalsFoodLog
                     goals={goals}
                     nutritionSummary={nutritionSummary}
                  />
               ) : null}
               {isSearching ? (
                  <Typography align='center' variant='h6' sx={{ pt: '1rem' }}>
                     Searching...
                  </Typography>
               ) : null}
            </Drawer>
         </>
      </>
   );
};
// };
