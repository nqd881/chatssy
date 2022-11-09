import {getChatsApi} from "@apis/user/get-chats";
import {useAppStore} from "@contexts/AppStoreContext";
import {useQuery} from "@tanstack/react-query";
import {sassClasses} from "@utils";
import {useEffect, useState} from "react";
import styles from "./ChatLeft.module.scss";
import {ChatList} from "./ChatList";
import {LeftHeader} from "./LeftHeader";
import {Search} from "./Search";

const cl = sassClasses(styles);

export const ChatLeft = () => {
  const {user} = useAppStore();

  const chats = useQuery({
    queryKey: ["chats"],
    queryFn: () => getChatsApi(user._id),
    enabled: Boolean(user._id),
  });

  return (
    <div className={cl("ChatLeft")}>
      <LeftHeader />
      <Search />
      <ChatList data={(chats.data as any) || []} />
    </div>
  );
};
