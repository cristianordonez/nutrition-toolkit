declare module '*.svg' {
   const content: any;
   export default content;
}

declare global {
   namespace Express {
      export interface User {
         id: string;
      }
   }
}


