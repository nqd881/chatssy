import React, {useState} from "react";
import {IconType} from "react-icons";
import {RiArrowDownSLine} from "react-icons/ri";
import {sassClasses} from "@utils";
import styles from "./ChatroomGroup.module.scss";
import {ChatroomData, ChatroomItem} from "./ChatroomItem";

const cl = sassClasses(styles);

export type ChatroomGroupProps = {
  name: string;
  icon: IconType;
  data: ChatroomData[];
  className?: string;
};

export const ChatroomGroup: React.FC<ChatroomGroupProps> = (props) => {
  const {name, icon: Icon, data, className} = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <div className={cl(["ChatroomGroup"], className)}>
      <div className={styles.name}>
        <span className={styles.value}>{name}</span>
        <button
          className={cl(["icon-btn", open ? "icon-open" : "icon-close"])}
          onClick={handleClick}
        >
          <RiArrowDownSLine size='1rem' />
        </button>
      </div>
      <div className={cl(["content", open ? "content-open" : ""])}>
        {data.map((chatroom) => (
          <ChatroomItem key={chatroom.id} data={chatroom} />
        ))}
      </div>
    </div>
  );
};
