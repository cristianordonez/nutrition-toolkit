declare const __API__: string;

declare module '*.svg' {
   const content: any;
   export default content;
}

declare global {
   namespace Express {
      interface User {
         id: string;
      }
   }
}
