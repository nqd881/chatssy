import {detectMeApi} from "@apis/auth/detect-me";
import {AppStoreProvider, useAppStore} from "@contexts/AppStoreContext";
import {ChatCenterContextProvider} from "@contexts/ChatCenterContext";
import {useChatCtx} from "@contexts/ChatContext";
import {useQuery} from "@tanstack/react-query";
import {sassClasses} from "@utils";
import {useEffect} from "react";
import {ChatCenter} from "./center/ChatCenter";
import styles from "./ChatApp.module.scss";
import {ChatLeft} from "./left/ChatLeft";
import {ChatRight} from "./right/ChatRight";

const cl = sassClasses(styles);

export const ChatApp = () => {
  const {chatAppRef} = useChatCtx();

  const {user, setUser} = useAppStore();

  const detectMe = useQuery({
    queryKey: ["me"],
    queryFn: detectMeApi,
    onSuccess: (data) => {
      console.log(data);
      if (setUser) setUser(data);
    },
    onError: (err) => {
      console.log(err);
    },
    enabled: Boolean(setUser),
  });

  if (detectMe.isLoading) {
    return <div>Loading me data ....</div>;
  }

  if (detectMe.error) {
    return <div>Have error when fetching data</div>;
  }

  return (
    <div ref={chatAppRef} className={cl("ChatApp")}>
      <ChatLeft />
      <ChatCenterContextProvider>
        <ChatCenter />
      </ChatCenterContextProvider>
      <ChatRight />
    </div>
  );
};
