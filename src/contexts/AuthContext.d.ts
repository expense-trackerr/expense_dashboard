declare module "./../contexts/AuthContext.js" {
    export const AuthContext: React.Context<any>;
    export function useAuth(): any;
    export function AuthProvider(props: any): JSX.Element;
  }
  