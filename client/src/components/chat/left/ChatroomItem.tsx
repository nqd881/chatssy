import {Avatar} from "@chakra-ui/react";
import {useRouter} from "next/router";
import React, {MouseEvent} from "react";
import {RiCheckDoubleLine} from "react-icons/ri";
import {sassClasses} from "@utils";
import styles from "./ChatroomItem.module.scss";

const cl = sassClasses(styles);

export type ChatroomData = {
  id: string | number;
  name: string;
  last_message: {
    content: string;
    time: string;
  };
  avatar: string;
};

export type ChatroomItemProps = {
  data: ChatroomData;
};

export const ChatroomItem: React.FC<ChatroomItemProps> = ({data}) => {
  const router = useRouter();
  const isCurrent = router.query.id == data.id;

  const handleClick = (e: MouseEvent) => {
    router.push({pathname: router.pathname, query: {id: data.id}}, undefined, {
      shallow: true,
    });
  };

  return (
    <div
      className={cl(["ChatroomItem", isCurrent ? "current" : ""])}
      onClick={handleClick}
    >
      <div className={cl("avatar")}>
        <Avatar size='md' src={data.avatar} />
      </div>
      <div className={cl("Info")}>
        <div className={cl("InfoLeft")}>
          <span className={cl("name")}>{data.name}</span>
          <span className={cl("last_message")}>
            {data.last_message.content}
          </span>
        </div>
        <div className={cl("InfoRight")}>
          <span className={cl("time")}>{data.last_message.time}</span>
          <span className={cl("seen")}>
            <RiCheckDoubleLine />
          </span>
        </div>
      </div>
    </div>
  );
};
