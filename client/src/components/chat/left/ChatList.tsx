import {VerticalScrollableView} from "@components/shared/VerticalScrollableView";
import {sassClasses} from "@utils";
import styles from "./ChatList.module.scss";
import {ChatroomData, ChatroomItem} from "./ChatroomItem";

const cl = sassClasses(styles);

export type ChatListProps = {
  data: any[];
};

export const ChatList = ({data}: ChatListProps) => {
  return (
    <VerticalScrollableView>
      <div className={cl("ChatList")}>
        {data.map((chatroom) => (
          <ChatroomItem key={chatroom._id} data={chatroom} />
        ))}
      </div>
    </VerticalScrollableView>
  );
};
