import styles from "./Groups.module.scss";
import {ChatroomGroup} from "./ChatroomGroup";
import {allChatrooms, pinnedChatrooms} from "./data";
import {VerticalScrollableView} from "@components/shared/VerticalScrollableView";
import {sassClasses} from "@utils";
import {Button, IconButton} from "@components/chatssy-ui/Button";
import {RiPencilFill} from "react-icons/ri";

const cl = sassClasses(styles);

export const Groups = () => {
  return (
    <div className={cl("Groups")}>
      <VerticalScrollableView>
        <ChatroomGroup {...pinnedChatrooms} />
        <ChatroomGroup {...allChatrooms} />
      </VerticalScrollableView>
      <IconButton className={cl("new-menu")}>
        <RiPencilFill className={cl("icon")} />
      </IconButton>
    </div>
  );
};
