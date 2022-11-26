declare module '*.svg' {
   const content: any;
   export default content;
}
declare module '*.png' {
   const content: any;
   export default content;
}

declare module '*.scss';

declare global {
   namespace Express {
      export interface User {
         id: string;
      }
   }
}

declare module 'passport-google-oidc';
