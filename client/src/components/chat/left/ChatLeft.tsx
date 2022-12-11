import {useChats} from "@hooks/api/useChats";
import {sassClasses} from "@utils";
import {MouseEvent} from "react";
import styles from "./ChatLeft.module.scss";
import {ChatList} from "./ChatList";
import {LeftHeader} from "./LeftHeader";
import {Search} from "./Search";

const cl = sassClasses(styles);

export const ChatLeft = ({doSomething}) => {
  // const chats = useChats();

  const handleClick = (e: MouseEvent) => {
    doSomething();
  };

  return (
    <div className={cl("ChatLeft")}>
      <button onClick={(e) => handleClick(e)}>Click</button>
      <LeftHeader />
      <Search />
      {/* <ChatList data={(chats.data as any) || []} /> */}
    </div>
  );
};
