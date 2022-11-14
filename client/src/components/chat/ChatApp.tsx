import {ChatCenterContextProvider} from "@contexts/ChatCenterContext";
import {useChatCtx} from "@contexts/ChatContext";
import {useMe} from "@hooks/api/useMe";
import {sassClasses} from "@utils";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {ChatCenter} from "./center/ChatCenter";
import styles from "./ChatApp.module.scss";
import {ChatLeft} from "./left/ChatLeft";
import {ChatRight} from "./right/ChatRight";

const cl = sassClasses(styles);

export const ChatApp = () => {
  const router = useRouter();
  const {chatAppRef} = useChatCtx();

  const me = useMe();

  // useEffect(() => {
  //   if (!me.data) {
  //     router.push("/auth/login");
  //   }
  // }, [router, me.data]);

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
