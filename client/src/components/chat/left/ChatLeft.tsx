import {getChatsApi} from "@apis/user/get-chats";
import {useChats} from "@hooks/api/useChats";
import {useMe} from "@hooks/api/useMe";
import {useQuery} from "@tanstack/react-query";
import {sassClasses} from "@utils";
import {useEffect, useState} from "react";
import styles from "./ChatLeft.module.scss";
import {ChatList} from "./ChatList";
import {LeftHeader} from "./LeftHeader";
import {Search} from "./Search";

const cl = sassClasses(styles);

export const ChatLeft = () => {
  // const me = useMe();

  // const chats = useQuery({
  //   queryKey: ["chats"],
  //   queryFn: () => getChatsApi((me.data as any)?._id),
  //   enabled: Boolean((me.data as any)?._id),
  // });

  const chats = useChats();

  return (
    <div className={cl("ChatLeft")}>
      <LeftHeader />
      <Search />
      <ChatList data={(chats.data as any) || []} />
    </div>
  );
};
