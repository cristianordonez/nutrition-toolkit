import { useEffect, useState } from 'react';

export function useLocalStorageState(key: string, defaultVal: string) {
   //make piece of state that is based off of the value in localstorage
   const [state, setState] = useState(() => {
      let val;
      try {
         //trying setting val to whatever is in localstorage under that key
         val = JSON.parse(
            window.localStorage.getItem(key) || String(defaultVal)
         );
      } catch (e) {
         //otherwise val is set to be whatever user passed in when returning the hook
         val = defaultVal;
      }
      return val;
   });
   //use useEffect to update localstorage when state changes
   useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(state));
   }, [state]);

   //now need to return the state and a way of setting the state
   return [state, setState];
}
