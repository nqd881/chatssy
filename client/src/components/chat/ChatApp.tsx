import {ChatCenterContextProvider} from "@contexts/ChatCenterContext";
import {useChatCtx} from "@contexts/ChatContext";
import {sassClasses} from "@utils";
import {ChatCenter} from "./center/ChatCenter";
import styles from "./ChatApp.module.scss";
import {ChatLeft} from "./left/ChatLeft";
import {ChatRight} from "./right/ChatRight";

const cl = sassClasses(styles);

export const ChatApp = () => {
  const {chatAppRef} = useChatCtx();

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
