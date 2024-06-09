import { ReactNode, createContext, useContext, useState } from 'react';
import { IUser } from '../interfaces/IUser';

interface IAuthContext {
  user?: IUser;
  signIn: (user: IUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  const signIn = (user: IUser) => {
    setUser(user);
  };

  const signOut = () => {
    setUser(undefined);
  };
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
