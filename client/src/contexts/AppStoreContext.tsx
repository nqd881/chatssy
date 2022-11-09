import {User} from "@apis/entities/user";
import React, {PropsWithChildren, useState} from "react";

export interface AppStoreContextValue {
  user: User;
  setUser: (user: any) => void;
}

export const AppStoreContext = React.createContext<AppStoreContextValue>({
  user: null,
  setUser: null,
} as AppStoreContextValue);

export const AppStoreProvider: React.FC<PropsWithChildren> = (props) => {
  const [user, setUser] = useState({});

  const value: AppStoreContextValue = {
    user,
    setUser,
  };

  return (
    <AppStoreContext.Provider value={value}>
      {props.children}
    </AppStoreContext.Provider>
  );
};

export const useAppStore = () => React.useContext(AppStoreContext);
